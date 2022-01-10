import { Router } from 'express';
import { AuthenticateUserController } from '@modules/account/useCases/Authenticate/AuthenticateUserUseCase/AuthenticateUserController';
import { RefreshTokenController } from '@modules/account/useCases/Authenticate/RefreshTokenUseCase/RefreshTokenController';

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/session', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
