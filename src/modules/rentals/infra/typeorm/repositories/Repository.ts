import { Rental } from '../entities/Rental';

export interface CreateRentalRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  total?: number;
  end_date?: Date;
  id?: string;
}

export interface RRepository {
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  create(data: CreateRentalRequest): Promise<Rental>;
  findById(rental_id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
}
