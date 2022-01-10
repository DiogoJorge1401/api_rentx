import { StorageProvider } from '@shared/container/providers/StorageProvider/StorageProvider';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../infra/typeorm/repositories/User/UserRepository';
interface AvatarRequest {
  id: string;
  avatar: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('StorageProvider')
    private storageProvider: StorageProvider
  ) {}

  async execute({ id, avatar }: AvatarRequest) {
    const user = await this.userRepository.findById(id);
    if (user.avatar) await this.storageProvider.delete(user.avatar, 'avatar');
    await this.storageProvider.save(avatar, 'avatar');
    user.avatar = avatar;
    await this.userRepository.update(user);
  }
}
