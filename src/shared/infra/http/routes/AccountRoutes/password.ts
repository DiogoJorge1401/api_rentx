import { SendForgotPasswordMailController } from '@modules/account/useCases/Authenticate/SendForgotPasswordMailUseCase/SendForgotPasswordMailController';
import { Router } from 'express';
import { ResetPasswordController } from '@modules/account/useCases/Authenticate/ResetPasswordUseCase/ResetPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
