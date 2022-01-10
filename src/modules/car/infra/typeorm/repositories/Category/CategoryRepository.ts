import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryRequest, CRepository } from './Repository';

export class CategoryRepository implements CRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }
  async findById(category_id: string): Promise<Category> {
    return await this.repository.findOne({ id: category_id });
  }

  async create({ name, description }: CategoryRequest): Promise<Category> {
    const category = this.repository.create({ name, description });
    return await this.repository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.repository.find();
  }
  async findByName(name: string): Promise<Boolean> {
    return !!(await this.repository.findOne({ name }));
  }
}
