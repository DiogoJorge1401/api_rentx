import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';
import { CARepository } from '../../../../car/infra/typeorm/repositories/Car';
import { RRepository } from '../../../infra/typeorm/repositories';

@injectable()
export class DevolutionRentalService {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: RRepository,
    @inject('CarRepository')
    private carRepository: CARepository,
    @inject('DayjsDateProvider')
    private dateProvider: DateProvider
  ) {}
  async execute(rental_id: string) {
    const rental = await this.rentalRepository.findById(rental_id);
    const minimum_daily = 1;
    if (!rental) throw new AppError("Rental doesn't exist");

    let daily = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.start_date
    );

    if (daily <= 0) daily = minimum_daily;

    const car = await this.carRepository.findCarById(rental.car_id);

    const delay = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );

    let total = 0;
    if (delay > 0) {
      const calculate_fine = car.fine_amount * delay;
      total = calculate_fine;
    }
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.carRepository.updateAvailable(rental.car_id, true);

    return await this.rentalRepository.create(rental);
  }
}
