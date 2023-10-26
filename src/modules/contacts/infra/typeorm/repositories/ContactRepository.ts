import { getRepository, Repository } from 'typeorm';

import IContactRepository from '@modules/contacts/repositories/IContactRepository';
import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';

import Contact from '../entities/Contact';

class ContactRepository implements IContactRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  public async findAll(): Promise<Contact[]> {
    const file = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return file;
  }

  public async findById(id: string): Promise<Contact | undefined> {
    const file = await this.ormRepository.findOne(id);

    return file;
  }

  public async create(data: ICreateContactDTO): Promise<Contact> {
    const file = this.ormRepository.create(data);

    await this.ormRepository.save(file);

    return file;
  }

  public async save(data: Contact): Promise<Contact> {
    return this.ormRepository.save(data);
  }
}

export default ContactRepository;
