import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1704649406682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "product"
    (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" text NOT NULL,
      "description" text NOT NULL,
      "goal" NUMERIC(2) NOT NULL,
      "image" character varying NOT NULL,
      "url" character varying,
      "contact_email" character varying NOT NULL,
      "contact_phone" character varying NOT NULL,
      "ownerId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"
      PRIMARY KEY ("id"))
    `);
    await queryRunner.query(`
      ALTER TABLE "product"
      ADD CONSTRAINT "FK_a3ffb1cf16421b9fc6f907b7433"
      FOREIGN KEY ("ownerId")
      REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_a3ffb1cf16421b9fc6f907b7433"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
