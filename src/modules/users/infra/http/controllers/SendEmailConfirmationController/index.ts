import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SendEmailConfirmationService from '../../../../services/SendEmailConfirmationService';

export default class SendEmailConfirmationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailConfirmation = container.resolve(
      SendEmailConfirmationService,
    );

    const user = await sendEmailConfirmation.execute({
      email,
    });

    return response.json(classToClass(user));
  }
}
