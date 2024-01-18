import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class Users1704651510051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({ name: 'email', type: 'text', isUnique: true }),
          new TableColumn({ name: 'name', type: 'varchar', length: '500' }),
          new TableColumn({ name: 'password', type: 'text' }),
          new TableColumn({
            name: 'role',
            type: 'enum',
            enum: ['investor', 'company'],
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('User');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('id') !== -1,
    );
    await queryRunner.dropForeignKey('User', foreignKey);
    await queryRunner.dropColumn('User', 'id');
    await queryRunner.dropTable('User');
  }
}
