import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { SRepository } from '../../../infra/typeorm/repositories/Specification/Repository';

interface RequestProps {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SRepository
  ) {}

  async execute({ description, name }: RequestProps) {
    const specificationAlreadyexist =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyexist)
      throw new AppError('Specification already exist!');
    return await this.specificationsRepository.create({ name, description });
  }
}
