import { Specification } from '../../infra/typeorm/entities/Specification';
import {
  SpecificationRequest,
  SRepository,
} from '../../infra/typeorm/repositories/Specification';

export class SpecificationRepositoryInMemory implements SRepository {
  private specifications: Specification[] = [];
  create({ name, description }: SpecificationRequest): Promise<Specification> {
    return new Promise((r) => {
      const specification = new Specification();
      Object.assign(specification, {
        name,
        description,
        created_at: new Date(),
      });
      this.specifications.push(specification);
      return r(specification);
    });
  }
  getAllCategories(): Promise<Specification[]> {
    return new Promise((r) => {
      return r(this.specifications);
    });
  }
  findByName(name: string): Promise<Boolean> {
    return new Promise((r) => {
      return r(this.specifications.some((s) => s.name === name));
    });
  }
  findByIds(ids: string[]): Promise<Specification[]> {
    return new Promise((r) => {
      return r(this.specifications.filter((sp) => ids.includes(sp.id)));
    });
  }
}
