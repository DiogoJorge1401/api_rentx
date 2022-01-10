import { auth } from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../errors/AppError';


interface verifyProps {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AppError('Token missing', 401);
  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(token, auth.secret_token) as verifyProps;
    req.user_id = user_id;
    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
};
