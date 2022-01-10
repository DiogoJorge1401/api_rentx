import { Category } from '../../infra/typeorm/entities/Category';
import {
  CategoryRequest,
  CRepository,
} from '../../infra/typeorm/repositories/Category/Repository';

export class CategoryRepositoryInMemory implements CRepository {
  private categories: Category[] = [];

  async findById(category_id: string): Promise<Category> {
    return new Promise((r) => {
      return r(this.categories.find((c) => c.id === category_id));
    });
  }
  async create({ name, description }: CategoryRequest): Promise<Category> {
    return new Promise((r) => {
      const category = new Category();
      Object.assign(category, { name, description, created_at: new Date() });
      this.categories.push(category);
      return r(category);
    });
  }
  async getAllCategories(): Promise<Category[]> {
    return new Promise((r) => {
      return r(this.categories);
    });
  }
  async findByName(name: string): Promise<Boolean> {
    return new Promise((r) => {
      return r(!!this.categories.find((c) => c.name === name));
    });
  }
}
