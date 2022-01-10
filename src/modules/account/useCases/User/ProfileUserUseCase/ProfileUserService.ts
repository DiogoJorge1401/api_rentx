import { inject, injectable } from 'tsyringe';
import { URepository } from '../../../infra/typeorm/repositories/User';
import { UserMap } from '../../../mapper/UserMapp';

@injectable()
export class ProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: URepository
  ) {}
  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id);
    return UserMap.toDTO(user);
  }
}
