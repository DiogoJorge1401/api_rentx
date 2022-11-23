import "reflect-metadata"
import {
  DateProvider,
  DayjsDateProvider,
} from '@shared/container/providers/DateProvider';
import { MailProviderInMemory } from '@shared/container/providers/DateProvider/InMemory/MailProviderInMemory';

import { URepository } from '../../../infra/typeorm/repositories/User';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';
import { UserRepositoryInMemory } from '../../../repositories/InMemory/UserRepositoryInMemory';
import { UserTokenRepositoryInMemory } from '../../../repositories/InMemory/UserTokenRepositoryInMemory';
import { SendForgotPasswordMailService } from './SendForgotPasswordMailService';
import { MailProvider } from '@shared/container/providers/MailProvider/MailProvider';
import { AppError } from '@shared/errors/AppError';

const makeFakeUser = () => {
  return {
    driver_license: 'QUws5r',
    email: 'solzisi@cocdi.pf',
    name: 'Johnny Lynch',
    password: '3v4KdH',
  };
};

describe('Send Forgot Mail', () => {
  let sendForgotPasswordMailService: SendForgotPasswordMailService;
  let userRepository: URepository;
  let userTokenRepository: UTRepository;
  let dateProvider: DateProvider;
  let mailProvider: MailProvider;
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userTokenRepository = new UserTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      userRepository,
      userTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    const user = await userRepository.create(makeFakeUser());
    await sendForgotPasswordMailService.execute(user.email);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
  it("should not be able to send a forgot password mail if user doesn't exist", async () => {
    expect(
      sendForgotPasswordMailService.execute('solzisi@cocdi.pf')
    ).rejects.toEqual(new AppError("User doesn't exist"));
  });
  it('should not be able to create an user token', async () => {
    const createUseToken = jest.spyOn(userTokenRepository, 'create');
    const user = await userRepository.create(makeFakeUser());
    await sendForgotPasswordMailService.execute(user.email);
    expect(createUseToken).toHaveBeenCalledTimes(1);
  });
});
