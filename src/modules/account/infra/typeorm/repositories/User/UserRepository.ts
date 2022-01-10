import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { URepository, UserRequest } from './Repository';

export class UserRepository implements URepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    driver_license,
    email,
    name,
    password,
  }: UserRequest): Promise<User> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
    });
    return await this.repository.save(user);
  }
  async getAllUsers(): Promise<User[]> {
    return await this.repository.find();
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }
  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
  async update(user: User): Promise<void> {
    await this.repository.update({ id: user.id }, user);
  }
}
