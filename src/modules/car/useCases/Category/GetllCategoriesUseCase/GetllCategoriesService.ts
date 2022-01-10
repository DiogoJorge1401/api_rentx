import { inject, injectable } from 'tsyringe';
import { CRepository } from '../../../infra/typeorm/repositories/Category';

@injectable()
export class GetAllCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CRepository
  ) {}
  async execute() {
    return await this.categoryRepository.getAllCategories();
  }
}
