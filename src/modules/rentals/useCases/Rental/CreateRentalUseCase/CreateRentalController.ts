import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalService } from './CreateRentalService';

export class CreateRentalController {
  async handle(req: Request, res: Response) {
    const { car_id, expected_return_date } = req.body;
    const { user_id } = req;
    const createRentalService = container.resolve(CreateRentalService);
    return res.status(201).json(
      await createRentalService.execute({
        car_id,
        expected_return_date,
        user_id,
      })
    );
  }
}
