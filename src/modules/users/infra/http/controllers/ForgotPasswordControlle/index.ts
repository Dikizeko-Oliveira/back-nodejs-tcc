import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordEmail = container.resolve(ForgotPasswordService);

    await forgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
