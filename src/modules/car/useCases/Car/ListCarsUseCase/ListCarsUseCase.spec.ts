import {
  CARepository,
  CarRequest,
} from '../../../infra/typeorm/repositories/Car';
import { CRepository } from '../../../infra/typeorm/repositories/Category';
import { CarRepositoryInMemory } from '../../../repositories/InMemory/CarRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../../repositories/InMemory/CategoryRepositoryInMemory';
import { CreateCarService } from '../CreateCarUseCase/CreateCarService';
import { ListCarsService } from './ListCarsService';

const makeFakeCarDTO = (): CarRequest => {
  return {
    name: 'Carrão',
    brand: 'Fake Brand',
    description: 'Fake Description',
    category_id: 'a1d3fo0n',
    daily_rate: 1000,
    fine_amount: 500,
    license_plate: 'A124P09',
  };
};

describe('List cars', () => {
  let listCarsService: ListCarsService;
  let carRepository: CARepository;
  let createCarService: CreateCarService;
  let categoryRepository: CRepository;

  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    listCarsService = new ListCarsService(carRepository);
    categoryRepository = new CategoryRepositoryInMemory();
    createCarService = new CreateCarService(carRepository, categoryRepository);
  });

  it('should be able list all available cars', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    const cars = await listCarsService.execute({});
    expect(cars).toHaveLength(1);
    expect(cars[0]).toEqual(car);
  });
  it('should be able list all available cars by name', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    await createCarService.execute({
      ...car,
      license_plate: 'XXXX',
    });
    const cars = await listCarsService.execute({ name: 'Carrão' });
    expect(cars).toHaveLength(2);
  });
  it('should be able list all available cars by brand', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    await createCarService.execute({
      ...car,
      license_plate: 'XXXX',
    });
    const cars = await listCarsService.execute({ brand: 'Fake Brand' });
    expect(cars).toHaveLength(2);
  });
  it('should be able list all available cars by brand', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    await createCarService.execute({
      ...car,
      license_plate: 'XXXX',
    });
    const cars = await listCarsService.execute({ category_id: category.id });
    expect(cars).toHaveLength(2);
  });
});
