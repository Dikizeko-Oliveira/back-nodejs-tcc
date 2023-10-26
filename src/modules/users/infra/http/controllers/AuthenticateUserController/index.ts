import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../../services/AuthenticateUserService';

export default class AuthenticateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const authenticatedUser = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass(authenticatedUser));
  }
}
