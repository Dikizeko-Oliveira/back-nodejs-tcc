import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

import User from '../../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
