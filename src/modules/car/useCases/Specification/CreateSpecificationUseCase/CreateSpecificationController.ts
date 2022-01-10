import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationService } from './CreateSpecificationService';

export class CreateSpecificationController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
      const createSpecificationService = container.resolve(
        CreateSpecificationService
      );
      return res.status(201).json(await createSpecificationService.execute({ name, description }));
  }
}
