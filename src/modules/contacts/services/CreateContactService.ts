import { injectable, inject } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Contact';
import IContactRepository from '../repositories/IContactRepository';

interface IRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository,
  ) {}

  public async execute({
    email,
    message,
    name,
    subject,
  }: IRequest): Promise<Contact> {
    const file = await this.contactRepository.create({
      email,
      message,
      name,
      subject,
    });

    return file;
  }
}

export default CreateContactService;
