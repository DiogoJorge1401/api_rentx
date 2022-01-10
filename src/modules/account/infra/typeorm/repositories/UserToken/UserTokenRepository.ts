import { getRepository, Repository } from 'typeorm';
import { UTRepository } from '.';
import { UserToken } from '../../entities/UserToken';
import { UserTokenRequest } from './Repository';

export class UserTokenRepository implements UTRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }
  async create({
    expire_in,
    refresh_token,
    user_id,
  }: UserTokenRequest): Promise<UserToken> {
    const userToken = this.repository.create({
      expire_in,
      refresh_token,
      user_id,
    });
    return await this.repository.save(userToken);
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return await this.repository.findOne({
      user_id,
      refresh_token,
    });
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return await this.repository.findOne({ refresh_token });
  }
}
