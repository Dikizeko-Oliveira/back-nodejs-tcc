import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import emailRouter from '@modules/users/infra/http/routes/email.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import contactRouter from '@modules/pets/infra/http/routes/contact.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/email', emailRouter);
routes.use('/password', passwordRouter);
routes.use('/contacts', contactRouter);

export default routes;
