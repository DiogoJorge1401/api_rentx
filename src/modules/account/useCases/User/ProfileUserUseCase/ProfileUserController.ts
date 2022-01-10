import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserService } from './ProfileUserService';
export class ProfileUserController {
  async handle(req: Request, res: Response) {
    const profileUserService = container.resolve(ProfileUserService);
    return res.json(await profileUserService.execute(req.user_id));
  }
}
