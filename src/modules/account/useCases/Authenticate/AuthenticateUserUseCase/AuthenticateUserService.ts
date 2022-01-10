import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { URepository } from '../../../infra/typeorm/repositories/User/Repository';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';
import { auth } from '@config/auth';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';

interface DataRequest {
  email: string;
  password: string;
}
interface UResponse {
  token: string;
  refresh_token: string;
  user: {
    email: string;
    name: string;
  };
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: URepository,
    @inject('UserTokenRepository')
    private userTokenRepository: UTRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: DateProvider
  ) {}

  async execute({ email, password }: DataRequest): Promise<UResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Email or password incorrect!');

    const decryptPassword = await compare(password, user.password);

    if (!decryptPassword) throw new AppError('Email or password incorrect!');

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const expire_in = this.dayjsDateProvider.addDays(
      expires_in_refresh_token_days
    );

    await this.userTokenRepository.create({
      expire_in,
      refresh_token: refresh_token,
      user_id: user.id,
    });

    return { token, refresh_token, user: { name: user.name, email } };
  }
}
