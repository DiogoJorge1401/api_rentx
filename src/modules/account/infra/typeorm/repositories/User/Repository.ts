import { User } from '../../entities/User';

export interface UserRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

export interface URepository {
  create({}: UserRequest): Promise<User>;
  getAllUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(user:User):Promise<void>
}