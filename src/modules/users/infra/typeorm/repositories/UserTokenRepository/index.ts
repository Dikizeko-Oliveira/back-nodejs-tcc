import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../../entities/UserToken';

class UserTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      token: v4(),
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
