import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IStoraProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../../repositories/IUserRepository';
import User from '../../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatar_file_name: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStoraProvider,
  ) {}

  public async execute({ user_id, avatar_file_name }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar_file_name);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
