import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalService } from './DevolutionRentalService';

export class DevolutionRentalController {
  async handle(req: Request, res: Response) {
    const devolutionRentalService = container.resolve(DevolutionRentalService);
    const { rental_id } = req.params;
    return res.json(await devolutionRentalService.execute(rental_id));
  }
}
