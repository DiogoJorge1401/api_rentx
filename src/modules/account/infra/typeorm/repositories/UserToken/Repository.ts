import { UserToken } from '../../entities/UserToken';

export interface UserTokenRequest {
  user_id: string;
  refresh_token: string;
  expire_in: Date;
}

export interface UTRepository {
  create(data: UserTokenRequest): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
