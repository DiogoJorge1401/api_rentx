import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../shared/errors/AppError';
import { Car } from '../../../infra/typeorm/entities/Car';
import { CARepository } from '../../../infra/typeorm/repositories/Car';

export interface CarRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
export class ListCarsService {
  constructor(
    @inject('CarRepository')
    private carsRepository: CARepository
  ) { }

  async execute(car: CarRequest) {
    if (!car.brand && !car.category_id && !car.name)
      return await this.carsRepository.findAllCarsAvailable();
    if (car?.name) return this.get('name', car);
    if (car?.brand) return this.get('brand', car);
    if (car?.category_id) return this.get('category_id', car);
    throw new AppError('Internal Server Error', 500)
  }
  private async get(op: string, car: CarRequest): Promise<Car[]> {
    return (await this.carsRepository.findAllCarsAvailable()).filter(
      (c) => c[op] === car[op]
    );
  }
}
