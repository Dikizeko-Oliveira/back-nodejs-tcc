import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ResetPasswordService from '../../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, password_confirmation, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    const user = await resetPassword.execute({
      password_confirmation,
      password,
      token,
    });

    return response.json(classToClass(user));
  }
}
