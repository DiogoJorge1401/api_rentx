import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateCarService } from './CreateCarService';

export class CreateCarController {
  async handle(req: Request, res: Response) {
    const createCarService = container.resolve(CreateCarService);
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = req.body;

    return res.status(201).json(
      await createCarService.execute({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
      })
    );
  }
}
