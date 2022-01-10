import { User } from '../../infra/typeorm/entities/User';
import { URepository, UserRequest } from '../../infra/typeorm/repositories/User/Repository';

export class UserRepositoryInMemory implements URepository {
  private users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: UserRequest): Promise<User> {
    return new Promise((r) => {
      const user = new User();
      Object.assign(user, {
        driver_license,
        email,
        name,
        password,
        created_at: new Date(),
        admin: false,
        avatar: '',
      });
      this.users.push(user);
      return r(user);
    });
  }
  async getAllUsers(): Promise<User[]> {
    return new Promise((r) => {
      return r(this.users);
    });
  }
  async findByEmail(email: string): Promise<User> {
    return new Promise((r) => {
      return r(this.users.find((u) => u.email === email));
    });
  }
  async findById(id: string): Promise<User> {
    return new Promise((r) => {
      return r(this.users.find((u) => u.id === id));
    });
  }
  async update(user: User): Promise<void> {
    return new Promise((r) => {
      const u = this.users.find((u) => u.id === user.id);
      Object.assign(u, user);
      return r();
    });
  }
}
