import { injectable, inject } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Pets';
import IContactRepository from '../repositories/IContactRepository';

interface IRequest {
  name: string;
  content: string;
}

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository,
  ) {}

  public async execute({
    name,
    content,
  }: IRequest): Promise<Contact> {
    const file = await this.contactRepository.create({
      name,
      content,
    });

    return file;
  }
}

export default CreateContactService;
