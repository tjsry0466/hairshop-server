import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifySeat1664471063864 implements MigrationInterface {
  name = 'modifySeat1664471063864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`seat\` json NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`unique_shopId\` ON \`seat\` (\`shopId\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`unique_shopId\` ON \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`seat\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP INDEX \`IDX_48f22e0a52baabad19360e3445\``);
  }
}
