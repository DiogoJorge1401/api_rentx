import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenService } from './RefreshTokenService';

export class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const token =
      req.body.token || req.headers['x-access-token'] || req.query.token;
    const refreshTokenService = container.resolve(RefreshTokenService);
    return res.json({ refresh_token:await refreshTokenService.execute(token)});
  }
}
