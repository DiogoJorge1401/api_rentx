import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { Category } from '../../../infra/typeorm/entities/Category';
import { CRepository } from '../../../infra/typeorm/repositories/Category/Repository';



interface RequestProps {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CRepository
  ) {}

  async execute({ description, name }: RequestProps): Promise<Category> {
    const categoryAlreadyexist = await this.categoryRepository.findByName(name);
    if (categoryAlreadyexist) throw new AppError('Category already exist!');
    return await this.categoryRepository.create({ name, description });
  }
}
