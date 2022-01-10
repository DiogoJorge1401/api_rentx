import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CarRequest } from '../../../infra/typeorm/repositories/Car';
import { ListCarsService } from './ListCarsService';

export class ListCarsController {
  async handle(req: Request, res: Response) {
    console.log('oioi');
    const listCarsService = container.resolve(ListCarsService);
    const { name, brand, category_id } = req.query as unknown as CarRequest;
    return res.json(
      await listCarsService.execute({ brand, category_id, name })
    );
  }
}
