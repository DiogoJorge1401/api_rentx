import { User } from '../infra/typeorm/entities/User';
export class UserMap {
  static toDTO({ avatar, driver_license, id, email, name }: User) {
    let avatarURL: string;
    if (process.env.disk === 's3')
      avatarURL = `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
    else avatarURL = `${process.env.APP_API_URL}/avatar/${avatar}`;
    return {
      avatar: avatarURL,
      driver_license,
      id,
      email,
      name,
    };
  }
}
