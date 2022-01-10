import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllSpecificationsService } from './FindAllSpecificationsService';

export class GetAllSpecificationsController {
  async handle(req: Request, res: Response) {
    const specificationsRepository = container.resolve(
      FindAllSpecificationsService
    );
    return res.json(await specificationsRepository.execute());
  }
}
