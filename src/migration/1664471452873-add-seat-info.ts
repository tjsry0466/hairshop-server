import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSeatInfo1664471452873 implements MigrationInterface {
  name = 'addSeatInfo1664471452873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`total\` int UNSIGNED NOT NULL DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`seatCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`availableCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`reservedCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`reservedCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`availableCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seatCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`total\``);
  }
}
