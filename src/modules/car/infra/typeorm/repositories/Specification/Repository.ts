import { Specification } from '../../entities/Specification';

export interface SpecificationRequest {
  name: string;
  description: string;
}

export interface SRepository {
  create({ name, description }: SpecificationRequest): Promise<Specification>;
  getAllCategories(): Promise<Specification[]>;
  findByName(name: string): Promise<Boolean>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
