import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateCarSpecificationController } from '@modules/car/useCases/Car/CreateCarSpecificationUseCase/CreateCarSpecificationController';
import { CreateCarController } from '@modules/car/useCases/Car/CreateCarUseCase/CreateCarController';
import { ListCarsController } from '@modules/car/useCases/Car/ListCarsUseCase/ListCarsController';
import { UploadCarImagesController } from '@modules/car/useCases/Car/UploadImagesUseCase/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';
import { upload } from '@config/upload';
const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const uploadCarImages = multer(upload);

carsRoutes.get('/', listCarsController.handle);
carsRoutes.use(ensureAuthenticated, ensureAdmin);
carsRoutes.post('/', createCarController.handle);
carsRoutes.post(
  '/images/:id',
  uploadCarImages.array('images'),
  uploadCarImageController.handle
);
carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);

export { carsRoutes };
