import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '../../../../services/UpdateUserAvatarService';

export default class UpdateUserAvatarController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id,
      avatar_file_name: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
