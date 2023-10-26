import { getRepository, Repository } from 'typeorm';

import IContactRepository from '@modules/pets/repositories/IContactRepository';
import ICreateContactDTO from '@modules/pets/dtos/ICreateContactDTO';

import Contact from '../entities/Pets';

class ContactRepository implements IContactRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  public async findAll(): Promise<Contact[]> {
    const file = await this.ormRepository.find({
      order: { name: 'ASC' },
    });

    return file;
  }

  public async findById(id: string): Promise<Contact | null> {
    const file = await this.ormRepository.findOne({where:{id}});

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
