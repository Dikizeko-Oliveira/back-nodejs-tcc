import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

import User from '../../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  birthdate: Date;
  cellphone_number: string;
  address_city: string;
  address_uf: string;
  profession: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    address_city,
    address_uf,
    birthdate,
    cellphone_number,
    profession,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    user.address_city = address_city;
    user.address_uf = address_uf;
    user.birthdate = birthdate;
    user.cellphone_number = cellphone_number;
    user.profession = profession;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
