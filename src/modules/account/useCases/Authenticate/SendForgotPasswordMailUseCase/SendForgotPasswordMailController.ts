import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailService } from './SendForgotPasswordMailService';

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const sendForgotPasswordMailService = container.resolve(
      SendForgotPasswordMailService
    );
    await sendForgotPasswordMailService.execute(email);
    return res.send();
  }
}
