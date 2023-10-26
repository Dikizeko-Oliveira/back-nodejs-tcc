import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const userController = new UserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/profile', ensureAuthenticated, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      profession: Joi.string().required(),
      address_city: Joi.string().required(),
      address_uf: Joi.string().required(),
      cellphone_number: Joi.string().required(),
      birthdate: Joi.string().required(),
      description: Joi.string().allow(null, ''),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  userController.create,
);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      profession: Joi.string().required(),
      address_city: Joi.string().required(),
      address_uf: Joi.string().required(),
      cellphone_number: Joi.string().required(),
      birthdate: Joi.string().required(),
      description: Joi.string().allow(null, ''),
      password: Joi.string().required(),
      old_password: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  userController.update,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.create,
);

export default usersRouter;
