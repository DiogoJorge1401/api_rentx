import 'reflect-metadata';
import 'dotenv/config';
import { connection } from '../typeorm';
import '@shared/container';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import swagger from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { routes } from './routes/routes';

import { resolve } from 'path';
import { upload } from '../../../config/upload';
import { AppError } from '../../errors/AppError';

connection();
const app = express();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(routes);
app.use(
  (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return res.status(err.statusCode).json({ message: err.message });
    return res.status(500).json({ message: err.message });
  }
);

export { app };
