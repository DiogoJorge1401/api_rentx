import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAllCategoriesService } from './GetllCategoriesService';
export class GetAllCategoriesController {
  async handle(req: Request, res: Response) {
    const getAllCategoriesService = container.resolve(GetAllCategoriesService);
    return res.json(await getAllCategoriesService.execute());
  }
}
