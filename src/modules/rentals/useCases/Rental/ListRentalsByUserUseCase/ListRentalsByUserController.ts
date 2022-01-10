import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserService } from './ListRentalsByUserService';

export class ListRentalsByUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const listRentalsByUserService = container.resolve(
      ListRentalsByUserService
    );
    return res.json(await listRentalsByUserService.execute(user_id));
  }
}
