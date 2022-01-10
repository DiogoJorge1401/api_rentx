import { inject, injectable } from 'tsyringe';
import { RRepository } from '../../../infra/typeorm/repositories';

@injectable()
export class ListRentalsByUserService {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: RRepository
  ) {}
  async execute(user_id: string) {
    return await this.rentalRepository.findByUserId(user_id);
  }
}
