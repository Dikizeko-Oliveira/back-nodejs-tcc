import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../../services/CreateUserService';
import GetUserProfileService from '../../../../services/GetUserProfileService';
import UpdateUserProfileService from '../../../../services/UpdateUserProfileService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getUserProfile = container.resolve(GetUserProfileService);

    const user = await getUserProfile.execute(user_id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { password, email, name, password_confirmation } =
      request.body;

    const createUser = container.resolve(CreateUserService);

    const userCreated = await createUser.execute({
      email,
      password,
      name,
      password_confirmation,
    });

    return response.json(classToClass(userCreated));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { password, email, name, address_city, address_uf } = request.body;
    const { cellphone_number, profession, old_password, birthdate } =
      request.body;

    const updateUser = container.resolve(UpdateUserProfileService);

    const userUpdated = await updateUser.execute({
      email,
      password,
      cellphone_number,
      name,
      user_id,
      old_password,
    });

    return response.json(classToClass(userUpdated));
  }
}
