import Contact from '../infra/typeorm/entities/Pets';
import ICreateContactDTO from '../dtos/ICreateContactDTO';

export default interface IContactRepository {
  findById(id: string): Promise<Contact | null>;
  findAll(): Promise<Contact[]>;
  create(data: ICreateContactDTO): Promise<Contact>;
  save(user: Contact): Promise<Contact>;
}
