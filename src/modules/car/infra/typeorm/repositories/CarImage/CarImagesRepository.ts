import { getRepository, Repository } from 'typeorm';
import { CarImage } from '../../entities/CarImage';
import { CarImageRequest, CIRepository } from './Repository';

export class CarImagesRepository implements CIRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create(data: CarImageRequest): Promise<CarImage> {
    const carImage = this.repository.create(data);
    return await this.repository.save(carImage);
  }
}
