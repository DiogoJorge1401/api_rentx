import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import { SpecificationRequest, SRepository } from './Repository';

export class SpecificationsRepository implements SRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }
  async create({
    name,
    description,
  }: SpecificationRequest): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    return await this.repository.save(specification);
  }
  async getAllCategories(): Promise<Specification[]> {
    return await this.repository.find();
  }
  async findByName(name: string): Promise<Boolean> {
    return !!(await this.repository.findOne({ name }));
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const sp = await this.repository.findByIds(ids);
    return sp
  }
}
