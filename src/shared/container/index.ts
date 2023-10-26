import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IAnimalRepository from '@modules/animals/repositories/IAnimalRepository';
import AnimalRepository from '@modules/animals/infra/typeorm/repositories/AnimalRepository';

import IAnimalFileRepository from '@modules/animals/repositories/IAnimalFileRepository';
import AnimalFileRepository from '@modules/animals/infra/typeorm/repositories/AnimalFileRepository';

import IAdoptionRepository from '@modules/adoptions/repositories/IAdoptionRepository';
import AdoptionRepository from '@modules/adoptions/infra/typeorm/repositories/AdoptionRepository';

import ISponsorshipRepository from '@modules/sponsorship/repositories/ISponsorshipRepository';
import SponsorshipRepository from '@modules/sponsorship/infra/typeorm/repositories/SponsorshipRepository';

import IAboutRepository from '@modules/about/repositories/IAboutRepository';
import AboutRepository from '@modules/about/infra/typeorm/repositories/AboutRepository';

import IContactRepository from '@modules/contacts/repositories/IContactRepository';
import ContactRepository from '@modules/contacts/infra/typeorm/repositories/ContactRepository';

import IEventRepository from '@modules/events/repositories/IEventRepository';
import EventRepository from '@modules/events/infra/typeorm/repositories/EventRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IAnimalRepository>(
  'AnimalRepository',
  AnimalRepository,
);

container.registerSingleton<IAnimalFileRepository>(
  'AnimalFileRepository',
  AnimalFileRepository,
);

container.registerSingleton<IAdoptionRepository>(
  'AdoptionRepository',
  AdoptionRepository,
);

container.registerSingleton<ISponsorshipRepository>(
  'SponsorshipRepository',
  SponsorshipRepository,
);

container.registerSingleton<IAboutRepository>(
  'AboutRepository',
  AboutRepository,
);

container.registerSingleton<IContactRepository>(
  'ContactRepository',
  ContactRepository,
);

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
);
