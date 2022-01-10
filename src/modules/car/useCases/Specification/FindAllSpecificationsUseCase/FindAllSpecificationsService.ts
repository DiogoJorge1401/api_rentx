import { inject, injectable } from 'tsyringe';
import { SRepository } from '../../../infra/typeorm/repositories/Specification/Repository';

@injectable()
export class FindAllSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepositor:SRepository
  ) {}

  async execute(){
    return await this.specificationsRepositor.getAllCategories()
  }
}