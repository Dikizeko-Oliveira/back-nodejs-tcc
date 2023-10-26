import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SendEmailConfirmationController from '../controllers/SendEmailConfirmationController';
import ConfirmEmailController from '../controllers/ConfirmEmailController';

const emailRouter = Router();
const emailConfirmationController = new SendEmailConfirmationController();
const confirmEmailController = new ConfirmEmailController();

emailRouter.post(
  '/confirmation',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  emailConfirmationController.create,
);

emailRouter.post(
  '/confirm',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().required(),
    }),
  }),
  confirmEmailController.create,
);

export default emailRouter;
