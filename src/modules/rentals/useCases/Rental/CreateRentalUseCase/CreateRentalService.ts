
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';
import { inject, injectable } from 'tsyringe';
import { CARepository } from '@modules/car/infra/typeorm/repositories/Car';
import {
  CreateRentalRequest,
  RRepository,
} from '../../../infra/typeorm/repositories';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateRentalService {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: RRepository,
    @inject('CarRepository')
    private carRepository: CARepository,
    @inject('DayjsDateProvider')
    private dateProvider: DateProvider
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: CreateRentalRequest) {
    const carexist = await this.carRepository.findCarById(car_id);
    if (!carexist) throw new AppError("Car doesn't exist");
    const unavailableCar = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );
    if (unavailableCar) throw new AppError('Car is unavailable');
    const user = await this.rentalRepository.findOpenRentalByUser(user_id);
    if (user) throw new AppError("There's a rental in progress for user");

    const compare = this.dateProvider.compareInHours(
      expected_return_date,
      this.dateProvider.dateNow()
    );

    if (compare < 24) throw new AppError('Invalid return time!');

    await this.carRepository.updateAvailable(car_id, false);

    return await this.rentalRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });
  }
}
