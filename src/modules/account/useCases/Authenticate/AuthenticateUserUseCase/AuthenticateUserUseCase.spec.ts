import "reflect-metadata"
import {
  DateProvider,
  DayjsDateProvider
} from '@shared/container/providers/DateProvider';
import { AppError } from '@shared/errors/AppError';
import { URepository } from '../../../infra/typeorm/repositories/User/Repository';
import { UTRepository } from '../../../infra/typeorm/repositories/UserToken';
import { UserRepositoryInMemory } from '../../../repositories/InMemory/UserRepositoryInMemory';
import { UserTokenRepositoryInMemory } from '../../../repositories/InMemory/UserTokenRepositoryInMemory';
import { CreateUserService } from '../../User/CreateUserUseCase/CreateUserService';
import { AuthenticateUserService } from './AuthenticateUserService';

const makeFakeUser = () => {
  return {
    driver_license: 'Fake Driver license',
    email: 'Fake email',
    name: 'Fake name',
    password: 'Fake password',
  };
};

describe('Authenticate User', () => {
  let userRepositoryInMemory: URepository;
  let userTokenRepositoryInMemory: UTRepository;
  let dateProvider: DateProvider;
  let authenticateUserService: AuthenticateUserService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserService = new AuthenticateUserService(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider
    );
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it('should be able authenticate an user', async () => {
    await createUserService.execute(makeFakeUser());
    const { user, token } = await authenticateUserService.execute(
      makeFakeUser()
    );
    expect(token).toBeTruthy();
  });
  it('should not be able authenticate an nonexistent user', async () => {
    expect(authenticateUserService.execute(makeFakeUser())).rejects.toEqual(
      new AppError('Email or password incorrect!')
    );
  });
  it('should not be able authenticate an user with incorrect password', async () => {
    await createUserService.execute(makeFakeUser());
    expect(
      authenticateUserService.execute({
        email: 'Fake email',
        password: 'Incorrect password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
