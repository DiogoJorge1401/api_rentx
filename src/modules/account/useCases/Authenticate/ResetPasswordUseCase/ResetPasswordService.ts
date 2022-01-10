import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { DateProvider } from '../../../../../shared/container/providers/DateProvider';
import { AppError } from '@shared/errors/AppError';
import { URepository } from '../../../infra/typeorm/repositories/User';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';


interface ResetPasswordRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: UTRepository,
    @inject('DayjsDateProvider')
    private dateProvider: DateProvider,
    @inject('UserRepository')
    private userRepository: URepository
  ) {}
  async execute({ password, token }: ResetPasswordRequest) {
    const tokenExist = await this.userTokenRepository.findByRefreshToken(token);
    if (!tokenExist) throw new AppError('Token invalid!');
    const expired = this.dateProvider.breforeIfAfter(
      tokenExist.expire_in,
      this.dateProvider.dateNow()
    );
    if (!expired) {
      await this.userTokenRepository.deleteById(tokenExist.id);
      throw new AppError('Token expired!');
    }
    const user = await this.userRepository.findById(tokenExist.user_id);

    user.password = await hash(password, 10);
    await this.userRepository.update(user);
    await this.userTokenRepository.deleteById(tokenExist.id);
  }
}
