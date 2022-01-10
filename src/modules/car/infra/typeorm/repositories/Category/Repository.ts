import { Category } from '../../entities/Category';


export interface CategoryRequest {
  name: string;
  description: string;
}
export interface CRepository {
  create({ name, description }: CategoryRequest): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  findByName(name: string): Promise<Boolean>;
  findById(category_id: string):Promise<Category>;
}