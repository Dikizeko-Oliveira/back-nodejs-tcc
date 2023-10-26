import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import Contact from '../infra/typeorm/entities/Contact';
import IContactRepository from '../repositories/IContactRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class GetContactsService {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Contact[]> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User does not exist', 404);
    }

    const file = await this.contactRepository.findAll();

    if (file.length === 0) {
      throw new AppError('Contact data does not exists', 404);
    }

    return file;
  }
}

export default GetContactsService;
