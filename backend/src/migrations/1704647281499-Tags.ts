import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tags1704647281499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "tag" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" text NOT NULL,
        CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );

    const tags = [
      'Health',
      'Education',
      'Infrastructure',
      'Tech',
      'IT',
      'Bio',
      'Fitness',
      'E-commerce',
    ].map((tag) => ({
      name: tag,
    }));

    await queryRunner.manager.insert('tag', tags);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
