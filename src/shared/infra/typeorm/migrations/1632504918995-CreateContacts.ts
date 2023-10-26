import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContacts1632504918995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telephone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'document',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'bank',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bank_account',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bank_iban',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fk_user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
