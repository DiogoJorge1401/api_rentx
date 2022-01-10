
import { CARepository } from '@modules/car/infra/typeorm/repositories/Car';
import { CarRepositoryInMemory } from '@modules/car/repositories/InMemory/CarRepositoryInMemory';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import dayjs from 'dayjs';
import { AppError } from '@shared/errors/AppError';
import { RRepository } from '../../../infra/typeorm/repositories';
import { RentalRepositoryInMemory } from '../../../repositories/InMemory/RentalRepositoryInMemory';
import { CreateRentalService } from './CreateRentalService';

describe('Create Rental', () => {
  let createRentalService: CreateRentalService;
  let rentalRepository: RRepository;
  let dayjsDateProvider: DateProvider;
  let dayAdd24Hours: Date;
  let carRepository: CARepository;

  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carRepository = new CarRepositoryInMemory();
    createRentalService = new CreateRentalService(
      rentalRepository,
      carRepository,
      dayjsDateProvider
    );
    dayAdd24Hours = dayjs().add(1, 'day').toDate();
  });

  it('should be able to create a new rental', async () => {
    const car = await carRepository.create({
      name: 'teste car 2',
      description: 'description test 2',
      daily_rate: 1500,
      license_plate: '9IOP90PO8',
      fine_amount: 750,
      brand: 'Brand test',
      category_id: '25945410-54f9-47e2-b0d6-513eac8b9716',
    });
    const rental = await createRentalService.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental with already rented car', async () => {
    const car = await carRepository.create({
      name: 'teste car 2',
      description: 'description test 2',
      daily_rate: 1500,
      license_plate: '9IOP90PO8',
      fine_amount: 750,
      brand: 'Brand test',
      category_id: '25945410-54f9-47e2-b0d6-513eac8b9716',
    });
    await createRentalService.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    });
    expect(
      createRentalService.execute({
        car_id: car.id,
        user_id: '123456',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental with a user already renting', async () => {
    const car = await carRepository.create({
      name: 'teste car 2',
      description: 'description test 2',
      daily_rate: 1500,
      license_plate: '9IOP90PO8',
      fine_amount: 750,
      brand: 'Brand test',
      category_id: '25945410-54f9-47e2-b0d6-513eac8b9716',
    });
    const car2 = await carRepository.create({
      name: 'teste car 2',
      description: 'description test 2',
      daily_rate: 1500,
      license_plate: '9IOP90PO8',
      fine_amount: 750,
      brand: 'Brand test',
      category_id: '25945410-54f9-47e2-b0d6-513eac8b9716',
    });
    await createRentalService.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    });
    expect(
      createRentalService.execute({
        car_id: car2.id,
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await carRepository.create({
      name: 'teste car 2',
      description: 'description test 2',
      daily_rate: 1500,
      license_plate: '9IOP90PO8',
      fine_amount: 750,
      brand: 'Brand test',
      category_id: '25945410-54f9-47e2-b0d6-513eac8b9716',
    });
    expect(
      createRentalService.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
