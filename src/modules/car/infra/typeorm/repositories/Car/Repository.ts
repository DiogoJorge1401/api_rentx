import { Car } from '../../entities/Car';
import { Specification } from '../../entities/Specification';

export interface CarRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export interface CARepository {
  create(data: CarRequest): Promise<Car>;
  findAllCars(): Promise<Car[]>;
  findAllCarsAvailable(): Promise<Car[]>;
  findAllCarsByCategory(category: string): Promise<Car[]>;
  findAllCarsByBrand(brand: string): Promise<Car[]>;
  findAllCarsByName(name: string): Promise<Car[]>;
  findCarByLicensePlate(license_plate: string): Promise<Car>;
  findCarById(car_id: string): Promise<Car>;
  updateAvailable(car_id, available: boolean): Promise<Car>;
}
