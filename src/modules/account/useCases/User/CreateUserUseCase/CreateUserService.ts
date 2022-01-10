import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { User } from '../../../infra/typeorm/entities/User';
import { URepository, UserRequest } from '../../../infra/typeorm/repositories/User/Repository';
@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: URepository
  ) {}

  async execute({
    driver_license,
    email,
    name,
    password,
  }: UserRequest): Promise<Error | User> {
    if (await this.userRepository.findByEmail(email))
      throw new AppError('User already exist');
    const hashedPass = await hash(password, 10);
    return await this.userRepository.create({
      driver_license,
      email,
      name,
      password: hashedPass,
    });
  }
}
