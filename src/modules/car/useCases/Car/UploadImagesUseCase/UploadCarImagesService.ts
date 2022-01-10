import { inject, injectable } from 'tsyringe';

import { CARepository } from '../../../infra/typeorm/repositories/Car';
import { CIRepository } from '../../../infra/typeorm/repositories/CarImage';
import { StorageProvider } from '@shared/container/providers/StorageProvider/StorageProvider';
import { AppError } from '@shared/errors/AppError';

interface Request {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesService {
  constructor(
    @inject('CarImagesRepository')
    private carImageRepository: CIRepository,
    @inject('CarRepository')
    private carsRepository: CARepository,
    @inject('StorageProvider')
    private storageProvider: StorageProvider
  ) {}

  async execute({ car_id, images_name }: Request) {
    const car = this.carsRepository.findCarById(car_id);
    if (!car) throw new AppError("Car doesn't exist");
    const images = [];
    for (const image of images_name) {
      this.storageProvider.save(image, 'cars');
      images.push(
        await this.carImageRepository.create({ car_id, image_name: image })
      );
    }
    return images;
  }
}
