import { getRepository, Repository } from 'typeorm';
import { CARepository, CarRequest } from '.';
import { Car } from '../../entities/Car';

export class CarRepository implements CARepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: CarRequest): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      id,
      license_plate,
      name,
      specifications,
    });
    return await this.repository.save(car);
  }
  async findAllCars(): Promise<Car[]> {
    return await this.repository.find();
  }
  async findAllCarsAvailable(): Promise<Car[]> {
    return await this.repository.find({ where: { available: true } });
  }
  async findAllCarsByCategory(category: string): Promise<Car[]> {
    return await this.repository.find({ where: { category_id: category } });
  }
  async findAllCarsByBrand(brand: string): Promise<Car[]> {
    return await this.repository.find({ where: { brand } });
  }
  async findAllCarsByName(name: string): Promise<Car[]> {
    return await this.repository.find({ where: { name } });
  }
  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate });
  }
  async findCarById(car_id: string): Promise<Car> {
    return await this.repository.findOne({ id: car_id });
  }
  async updateAvailable(car_id: any, available: boolean): Promise<Car> {
    const car = await this.repository.findOne({ id: car_id });
    car.available = available;
    return await this.repository.save(car);
  }
}
