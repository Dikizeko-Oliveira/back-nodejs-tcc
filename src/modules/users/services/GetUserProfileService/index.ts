import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';

@injectable()
class GetUserProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    const findUser = await this.usersRepository.findById(
      '89d940cc-4aba-47ba-acde-a22790429c16',
    );

    if (!findUser) {
      throw new AppError('User does not exist', 404);
    }

    return findUser;
  }
}

export default GetUserProfileService;
