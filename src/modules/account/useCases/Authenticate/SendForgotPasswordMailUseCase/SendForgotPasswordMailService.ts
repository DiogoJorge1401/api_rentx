import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';
import { AppError } from '@errors/AppError';
import { URepository } from '../../../infra/typeorm/repositories/User';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';

import { resolve } from 'path';
import { MailProvider } from '@shared/container/providers/MailProvider/MailProvider';

@injectable()
export class SendForgotPasswordMailService {
  constructor(
    @inject('UserRepository')
    private userRepository: URepository,
    @inject('UserTokenRepository')
    private userTokenRepository: UTRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: DateProvider,
    @inject('MailProvider')
    private mailProvider: MailProvider
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("User doesn't exist");
    const token = uuid();
    await this.userTokenRepository.create({
      expire_in: this.dayjsDateProvider.addHours(1),
      refresh_token: token,
      user_id: user.id,
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'ForgotPassword.hbs'
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      path: templatePath,
      variables,
    });
  }
}
