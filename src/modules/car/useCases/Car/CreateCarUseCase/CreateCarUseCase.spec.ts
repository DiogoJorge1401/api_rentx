import 'reflect-metadata';

import {
  CARepository,
  CarRequest,
} from '../../../infra/typeorm/repositories/Car';
import { CarRepositoryInMemory } from '../../../repositories/InMemory/CarRepositoryInMemory';
import { CreateCarService } from './CreateCarService';
import { CRepository } from '../../../infra/typeorm/repositories/Category';
import { CategoryRepositoryInMemory } from '../../../repositories/InMemory/CategoryRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

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

describe('Create a new car', () => {
  let createCarService: CreateCarService;
  let carRepository: CARepository;
  let categoryRepository: CRepository;

  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    categoryRepository = new CategoryRepositoryInMemory();
    createCarService = new CreateCarService(carRepository, categoryRepository);
  });

  it('should be able to create a new car', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a new car with an existing license plate', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    expect(
      createCarService.execute({
        ...makeFakeCarDTO(),
        category_id: category.id,
      })
    ).rejects.toEqual(new AppError('Car already exist'));
  });
  it('should be able to create a new car with available true by default', async () => {
    const category = await categoryRepository.create({
      name: 'teste 2',
      description: 'description 2',
    });
    const car = await createCarService.execute({
      ...makeFakeCarDTO(),
      category_id: category.id,
    });
    expect(car).toHaveProperty('available', true);
  });
});
