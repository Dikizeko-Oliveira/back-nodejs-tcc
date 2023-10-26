import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IContactRepository from '@modules/pets/repositories/IContactRepository';
import ContactRepository from '@modules/pets/infra/typeorm/repositories/ContactRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IContactRepository>(
  'ContactRepository',
  ContactRepository,
);