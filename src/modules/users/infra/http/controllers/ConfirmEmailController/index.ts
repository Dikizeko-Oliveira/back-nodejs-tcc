import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ConfirmEmailService from '../../../../services/ConfirmEmailService';

export default class ConfirmEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const confirmEmail = container.resolve(ConfirmEmailService);

    const emailConfirmed = await confirmEmail.execute({
      token,
    });

    return response.json(classToClass(emailConfirmed));
  }
}
