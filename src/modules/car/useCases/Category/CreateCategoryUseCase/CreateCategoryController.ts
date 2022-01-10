import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from './CreateCategoryService';

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createCategoryService = container.resolve(CreateCategoryService);
    return res.status(201).json(
      await createCategoryService.execute({
        name,
        description,
      })
    );
  }
}
