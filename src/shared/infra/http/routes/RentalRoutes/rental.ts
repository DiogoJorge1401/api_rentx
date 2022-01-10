import { CreateRentalController } from '@modules/rentals/useCases/Rental/CreateRentalUseCase/CreateRentalController';
import { Router } from 'express';
import { DevolutionRentalController } from '@modules/rentals/useCases/Rental/DevolutionRentalUseCase/DevolutionRentalController';
import { ensureAdmin } from '../../middlewares/ensureAdmin';
import { ListRentalsByUserController } from '@modules/rentals/useCases/Rental/ListRentalsByUserUseCase/ListRentalsByUserController';

const rental = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rental.post('/', createRentalController.handle);
rental.post(
  '/devolution/:rental_id',
  ensureAdmin,
  devolutionRentalController.handle
);
rental.get('/user', listRentalsByUserController.handle);
export { rental };
