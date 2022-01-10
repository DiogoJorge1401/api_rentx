import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordService } from './ResetPasswordService';

export class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token } = req.query;
    const { password } = req.body;
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({ token: String(token), password });
    return res.send();
  }
}
