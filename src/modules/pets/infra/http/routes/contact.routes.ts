import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ContactController from '../controllers/ContactController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get('/', ensureAuthenticated, contactController.getAll);
contactRouter.get('/:id', ensureAuthenticated, contactController.index);

contactRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      content: Joi.string().required(),
    }),
  }),
  contactController.create,
);

export default contactRouter;
