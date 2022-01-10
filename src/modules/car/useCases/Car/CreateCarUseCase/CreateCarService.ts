import { inject, injectable } from 'tsyringe';

import {
  CARepository,
  CarRequest,
} from '../../../infra/typeorm/repositories/Car';
import { Car } from '../../../infra/typeorm/entities/Car';
import { CRepository } from '../../../infra/typeorm/repositories/Category';
import { AppError } from '@shared/errors/AppError';
@injectable()
export class CreateCarService {
  constructor(
    @inject('CarRepository')
    private carsRepository: CARepository,
    @inject('CategoryRepository')
    private categoryRepsoitory: CRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: CarRequest): Promise<Car> {
    const car = await this.carsRepository.findCarByLicensePlate(license_plate);
    if (car) throw new AppError('Car already exist');
    const category = await this.categoryRepsoitory.findById(category_id);
    if (!category) throw new AppError("Category doesn't exist");
    return await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
  }
}
