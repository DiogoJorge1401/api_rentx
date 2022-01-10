import { Rental } from '../../infra/typeorm/entities/Rental';
import {
  CreateRentalRequest,
  RRepository,
} from '../../infra/typeorm/repositories';

export class RentalRepositoryInMemory implements RRepository {
  private repository: Rental[] = [];

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return new Promise((r) => {
      return r(
        this.repository.find(
          (r) => r.user_id === user_id && r.end_date === null
        )
      );
    });
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return new Promise((r) => {
      return r(
        this.repository.find((r) => r.car_id === car_id && r.end_date === null)
      );
    });
  }
  async create(data: CreateRentalRequest): Promise<Rental> {
    return new Promise((r) => {
      const rental = new Rental();
      Object.assign(rental, {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        start_date: new Date(),
        end_date: null,
      });
      this.repository.push(rental);
      return r(rental);
    });
  }
  async findById(rental_id: string): Promise<Rental> {
    return new Promise((r) => {
      return r(this.repository.find((r) => r.id === rental_id));
    });
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return new Promise((r) => {
      return r(this.repository.filter((r) => r.user_id === user_id));
    });
  }
}
