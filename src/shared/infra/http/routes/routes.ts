import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { Router } from 'express';
import {
  authenticateRoutes,
  usersRoutes,
  passwordRoutes,
} from './AccountRoutes';
import {
  carsRoutes,
  categoriesRoutes,
  specificationsRoutes,
} from './CarRoutes';
import { rental } from './RentalRoutes';

const routes = Router();

routes.use('/category', ensureAuthenticated, ensureAdmin, categoriesRoutes);
routes.use(
  '/specification',
  ensureAuthenticated,
  ensureAdmin,
  specificationsRoutes
);
routes.use('/car', carsRoutes);
routes.use('/user', usersRoutes);
routes.use('/rental', ensureAuthenticated, rental);
routes.use(authenticateRoutes);
routes.use("/password",passwordRoutes);
export { routes };
