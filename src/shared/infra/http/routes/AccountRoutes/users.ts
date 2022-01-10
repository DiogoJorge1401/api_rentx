import { Router } from 'express';
import multer from 'multer';
import { upload } from '@config/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/account/useCases/User/CreateUserUseCase/CreateUserController';
import { UpdateUserAvatarController } from '@modules/account/useCases/User/UpdateUserAvatarUseCase/UpdateUserAvatarController';
import { ProfileUserController } from '@modules/account/useCases/User/ProfileUserUseCase/ProfileUserController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(upload);

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle
);

export { usersRoutes };
