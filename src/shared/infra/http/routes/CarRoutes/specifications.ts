import { Router, Response, Request } from 'express';
import { CreateSpecificationController } from '@modules/car/useCases/Specification/CreateSpecificationUseCase/CreateSpecificationController';
import { GetAllSpecificationsController } from '@modules/car/useCases/Specification/FindAllSpecificationsUseCase/FindAllSpecificationsController';
import { ensureAdmin } from '@middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const getAllSpecificationsController = new GetAllSpecificationsController();

specificationsRoutes.post(
  '/',
  ensureAdmin,
  createSpecificationController.handle
);
specificationsRoutes.get('/', getAllSpecificationsController.handle);

export { specificationsRoutes };
