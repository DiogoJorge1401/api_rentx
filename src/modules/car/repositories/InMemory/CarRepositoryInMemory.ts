import { Car } from '../../infra/typeorm/entities/Car';
import { CARepository, CarRequest } from '../../infra/typeorm/repositories/Car';

export class CarRepositoryInMemory implements CARepository {
  private readonly cars: Car[] = [];
  async create(data: CarRequest): Promise<Car> {
    return new Promise((r) => {
      const car = new Car();
      Object.assign(car, { ...data, created_at: new Date(), available: true });
      this.cars.push(car);
      return r(car);
    });
  }
  async findAllCars(): Promise<Car[]> {
    return new Promise((r) => {
      return r(this.cars);
    });
  }
  findAllCarsAvailable(): Promise<Car[]> {
    return new Promise((r) => {
      return r(this.cars.filter((c) => c.available === true));
    });
  }
  async findAllCarsByCategory(category: string): Promise<Car[]> {
    return new Promise((r) => {
      return r(this.cars.filter((c) => c.category_id === category));
    });
  }
  async findAllCarsByBrand(brand: string): Promise<Car[]> {
    return new Promise((r) => {
      return r(this.cars.filter((c) => c.brand === brand));
    });
  }
  async findAllCarsByName(name: string): Promise<Car[]> {
    return new Promise((r) => {
      return r(this.cars.filter((c) => c.name === name));
    });
  }
  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return new Promise((r) => {
      return r(this.cars.find((c) => c.license_plate === license_plate));
    });
  }
  async findCarById(car_id: string): Promise<Car> {
    return new Promise((r) => {
      return r(this.cars.find((c) => c.id === car_id));
    });
  }
  async update(car: Car): Promise<Boolean> {
    return new Promise((r) => {
      const idx = this.cars.findIndex((c) => c.id === car.id);
      const result = this.cars.splice(idx, 1, car);
      return r(!!result.length);
    });
  }
  async updateAvailable(car_id: any, available: boolean): Promise<Car> {
    return new Promise((r) => {
      const carIDX = this.cars.findIndex((c) => c.id === car_id); 
      this.cars[carIDX].available = available
      return r(this.cars[carIDX]);
    });
  }
}
