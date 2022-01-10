import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { CARepository } from '../../../infra/typeorm/repositories/Car';
import { SRepository } from '../../../infra/typeorm/repositories/Specification';

export interface CreateCarSpecificationProps {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationService {
  constructor(
    @inject('CarRepository')
    private carRepository: CARepository,
    @inject('SpecificationsRepository')
    private specificationRepository: SRepository
  ) {}

  async execute({ car_id, specifications_id }: CreateCarSpecificationProps) {
    const car = await this.carRepository.findCarById(car_id);
    if (!car) throw new AppError("Car doesn't exist");
    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );
    if (!specifications.length)
      throw new AppError("Specification doesn't exist");
      
    car.specifications = specifications;
    return await this.carRepository.create(car);
  }
}
