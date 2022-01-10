import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/car/useCases/Category/CreateCategoryUseCase/CreateCategoryController';
import { GetAllCategoriesController } from '@modules/car/useCases/Category/GetllCategoriesUseCase/GetllCategoriesController';
import { ImportCategoryController } from '@modules/car/useCases/Category/ImportCategoryUseCase/ImportCategoryController';
const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const getAllCategoriesController = new GetAllCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', getAllCategoriesController.handle);
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
