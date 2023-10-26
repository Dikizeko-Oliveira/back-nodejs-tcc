export default interface ICreateUserDTO {
  name: string;
  birthdate: Date;
  email: string;
  cellphone_number: string;
  address_city: string;
  address_uf: string;
  profession: string;
  password: string;
  description?: string;
}
