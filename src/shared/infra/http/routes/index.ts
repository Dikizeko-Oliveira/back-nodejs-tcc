import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import emailRouter from '@modules/users/infra/http/routes/email.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import animalRouter from '@modules/animals/infra/http/routes/animal.routes';
import animalFileRouter from '@modules/animals/infra/http/routes/animal_file.routes';
import adoptionRouter from '@modules/adoptions/infra/http/routes/adoption.routes';
import sponsorshipRouter from '@modules/sponsorship/infra/http/routes/sponsorship.routes';
import aboutRouter from '@modules/about/infra/http/routes/about.routes';
import eventRouter from '@modules/events/infra/http/routes/event.routes';
import contactRouter from '@modules/contacts/infra/http/routes/contact.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/email', emailRouter);
routes.use('/password', passwordRouter);
routes.use('/animals', animalRouter);
routes.use('/animals_file', animalFileRouter);
routes.use('/adoptions', adoptionRouter);
routes.use('/sponsorships', sponsorshipRouter);
routes.use('/about', aboutRouter);
routes.use('/events', eventRouter);
routes.use('/contacts', contactRouter);

export default routes;
