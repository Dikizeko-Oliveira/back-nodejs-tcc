import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactService from '../../../services/CreateContactService';
import GetContactService from '../../../services/GetContactService';
import GetPetService from '../../../services/GetPetService';

export default class ContactController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    
    const getAboutData = container.resolve(GetPetService);

    const data = await getAboutData.execute({ user_id, id });

    return response.json(data);
  }
  
  public async getAll(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getAboutData = container.resolve(GetContactService);

    const data = await getAboutData.execute({ user_id });

    return response.json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, content } = request.body;

    const createAbout = container.resolve(CreateContactService);

    const createdData = await createAbout.execute({
      name,
      content,
    });

    return response.json(createdData);
  }
}
