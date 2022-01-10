import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';
export class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const { file } = req;
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    await updateUserAvatarService.execute({
      avatar: file.filename,
      id: user_id,
    });
    return res.status(204).send();
  }
}
