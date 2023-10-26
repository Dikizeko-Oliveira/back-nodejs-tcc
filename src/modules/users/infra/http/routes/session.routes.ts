import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserController from '../controllers/AuthenticateUserController';

const sessionsRouter = Router();
const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticateUserController.create,
);

export default sessionsRouter;
