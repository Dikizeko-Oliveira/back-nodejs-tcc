import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
class Contacts {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  telephone!: string;

  @Column()
  document!: string;

  @Column()
  bank!: string;

  @Column()
  fk_user_id!: string;

  @Column()
  bank_account!: string;

  @Column()
  bank_iban!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Contacts;
