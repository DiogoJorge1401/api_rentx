import { UserToken } from '../../infra/typeorm/entities/UserToken';
import {
  UserTokenRequest,
  UTRepository,
} from '../../infra/typeorm/repositories/UserToken';

export class UserTokenRepositoryInMemory implements UTRepository {
  private repository: UserToken[] = [];

  create(data: UserTokenRequest): Promise<UserToken> {
    return new Promise((r) => {
      const userToken = new UserToken();
      Object.assign(userToken, { ...data, created_at: new Date() });
      this.repository.push(userToken);
      return r(userToken);
    });
  }
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return new Promise((r) => {
      return r(
        this.repository.find(
          (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
        )
      );
    });
  }
  deleteById(id: string): Promise<void> {
    return new Promise((r) => {
      const ut = this.repository.findIndex((ut) => ut.id === id);
      this.repository.splice(ut, 1);
      return r();
    });
  }
  findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return new Promise((r) => {
      const ut = this.repository.find(
        (ut) => ut.refresh_token === refresh_token
      );
      return r(ut);
    });
  }
}
