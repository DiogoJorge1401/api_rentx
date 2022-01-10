import { NextFunction, Response, Request } from 'express';
import { UserRepository } from '@modules/account/infra/typeorm/repositories/User';
import { AppError } from '../../../errors/AppError';

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req;
  const ur = new UserRepository();
  const user = await ur.findById(user_id);
  if (!user.admin) throw new AppError("User isn't admin");
  next();
};
