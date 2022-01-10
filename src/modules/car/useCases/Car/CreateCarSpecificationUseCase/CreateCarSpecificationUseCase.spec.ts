
import { AppError } from '@shared/errors/AppError';
import {
  CARepository,
  CarRequest,
} from '../../../infra/typeorm/repositories/Car';
import { SRepository } from '../../../infra/typeorm/repositories/Specification';
import { CarRepositoryInMemory } from '../../../repositories/InMemory/CarRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../../repositories/InMemory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationService } from './CreateCarSpecificationService';

const makeFakeSpecificationsCar = () => {
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
  const makeFakeSpecificationDTO = () => {
    return {
      name: 'Fake Specification' + new Date(),
      description: 'Fake Description' + new Date(),
    };
  };

  return {
    makeFakeCarDTO,
    makeFakeSpecificationDTO,
  };
};

describe('Create a new car specification', () => {
  let createCarSpecificationService: CreateCarSpecificationService;
  let carRepositoryInMemory: CARepository;
  let specificationRepositoryInMemory: SRepository;

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationService = new CreateCarSpecificationService(
      carRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it('should be able to add a new car specification', async () => {
    const { makeFakeCarDTO, makeFakeSpecificationDTO } =
      makeFakeSpecificationsCar();

    const car = await carRepositoryInMemory.create(makeFakeCarDTO());
    const specification = await specificationRepositoryInMemory.create(
      makeFakeSpecificationDTO()
    );
    const result = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
    expect(result).toBeTruthy()
  });
  it('should not be able to add a new car specification with non-existent car_id', async () => {
    expect(
      createCarSpecificationService.execute({
        car_id: '12',
        specifications_id: ['id_test'],
      })
    ).rejects.toEqual(new AppError("Car doesn't exist"));
  });
  it('should not be able to add a new car specification with non-existents specifications_id', async () => {
    const { makeFakeCarDTO } = makeFakeSpecificationsCar();
    const car = await carRepositoryInMemory.create(makeFakeCarDTO());

    expect(
      createCarSpecificationService.execute({
        car_id: car.id,
        specifications_id: ['de3de35'],
      })
    ).rejects.toEqual(new AppError("Specification doesn't exist"));
  });
});
