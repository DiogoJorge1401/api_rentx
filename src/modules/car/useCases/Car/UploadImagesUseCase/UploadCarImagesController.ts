import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesService } from './UploadCarImagesService';

export class UploadCarImagesController {
  async handle(req: Request, res: Response) {
    const images = req.files as Express.Multer.File[];
    const { id } = req.params;
    const uploadCarImageService = container.resolve(UploadCarImagesService);
    const images_name = images.map((i) => i.filename);
    return res.status(201).json(
      await uploadCarImageService.execute({
        car_id: id,
        images_name,
      })
    );
  }
}
