export default interface ICreateContactDTO {
  name: string;
  email?: string;
  telephone?: string;
  document: string;
  fk_user_id: string;
  bank?: string;
  bank_account?: string;
  bank_iban?: string;
}
