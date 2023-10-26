import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../../repositories/IUserRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IUserData {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface IResponse {
  user: IUserData;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password combination.', 401);
    }

    if (user.email_confirmed !== true) {
      throw new AppError('Email not confirmed', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password combination', 401);
    }

    const userData = {
      id: user.id,
      name: user.name,
      avatar_url: user.getavatarUrl(),
    };

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, String(secret), {
      subject: user.id,
      expiresIn,
    });

    return {
      user: userData,
      token,
    };
  }
}

export default AuthenticateUserService;
