import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

import User from '../../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  birthdate: Date;
  email: string;
  cellphone_number: string;
  address_city: string;
  address_uf: string;
  profession: string;
  password: string;
  password_confirmation: string;
  description?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    birthdate,
    address_city,
    cellphone_number,
    address_uf,
    profession,
    description,
    password,
    password_confirmation,
  }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 401);
    }

    if (password !== password_confirmation) {
      throw new AppError('Password does not match.', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      birthdate,
      address_city,
      address_uf,
      cellphone_number,
      profession,
      description,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
