import { CarImage } from '../../entities/CarImage';

export interface CarImageRequest {
  car_id: string;
  image_name: string;
}

export interface CIRepository {
  create(data: CarImageRequest): Promise<CarImage>;
}
