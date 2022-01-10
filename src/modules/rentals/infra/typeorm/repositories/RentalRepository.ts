import { getRepository, Repository } from 'typeorm';
import { RRepository } from '.';
import { Rental } from '../entities/Rental';
import { CreateRentalRequest } from './Repository';

export class RentalRepository implements RRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      user_id,
      end_date: null,
    });
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      car_id,
      end_date: null,
    });
  }
  async create(data: CreateRentalRequest): Promise<Rental> {
    const rental = this.repository.create({ ...data });
    return await this.repository.save(rental);
  }
  async findById(rental_id: string): Promise<Rental> {
    return await this.repository.findOne({ id: rental_id, end_date: null });
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
  }
}
