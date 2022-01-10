import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from './AuthenticateUserService';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    return res.json(await authenticateUserService.execute({ email, password }));
  }
}
