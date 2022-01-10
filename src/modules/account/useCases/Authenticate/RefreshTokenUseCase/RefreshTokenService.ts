import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { auth } from '@config/auth';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';
import { AppError } from '@errors/AppError';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';

interface Payload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: UTRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: DateProvider
  ) {}
  async execute(refreshtoken: string) {
    const {
      secret_refresh_token,
      expires_in_refresh_token_days,
      expires_in_refresh_token,
      secret_token,
      expires_in_token,
    } = auth;
    
    const { sub: user_id, email } = verify(
      refreshtoken,
      secret_refresh_token
    ) as Payload;

    const user_token =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        refreshtoken
      );

    if (!user_token) throw new AppError("Refresh token doesn't exist");

    await this.userTokenRepository.deleteById(user_token.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    const expire_in = this.dayjsDateProvider.addDays(
      expires_in_refresh_token_days
    );

    await this.userTokenRepository.create({
      expire_in,
      refresh_token: refresh_token,
      user_id: user_token.user_id,
    });

    return { refresh_token, token };
  }
}
