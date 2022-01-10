import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationService } from './CreateCarSpecificationService';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response) {
    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );
    const { specifications_id } = req.body;
    const { id } = req.params;
    console.log('Controller');
    return res.status(201).json(
      await createCarSpecificationService.execute({
        car_id: id,
        specifications_id,
      })
    );
  }
}
