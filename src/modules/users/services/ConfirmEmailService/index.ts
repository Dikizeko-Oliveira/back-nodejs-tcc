import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserRepository';
import UserTokenRepository from '../../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
}

@injectable()
class EmailConfirmationService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.email_confirmed) {
      throw new AppError('Email already confirmed.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 24);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Sorry, token expired!');
    }

    user.email_confirmed = true;

    await this.usersRepository.save(user);
  }
}

export default EmailConfirmationService;
