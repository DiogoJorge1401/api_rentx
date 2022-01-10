import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from './CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = container.resolve(CreateUserService);
    const { driver_license, email, name, password } = req.body;
    return res.status(201).json(
      await createUserService.execute({
        driver_license,
        email,
        name,
        password,
      })
    );
  }
}
