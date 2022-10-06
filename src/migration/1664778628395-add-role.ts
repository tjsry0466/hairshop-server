import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRole1664778628395 implements MigrationInterface {
  name = 'addRole1664778628395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`unique_shopId\` ON \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`total\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seatCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`unavailableCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`reservedCount\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`nonSeatCount\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('admin', 'designer', 'user') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`seat\` text NOT NULL`);
    await queryRunner.query(`CREATE INDEX \`shopId\` ON \`seat\` (\`shopId\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`seat\``);
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`seat\` json NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`nonSeatCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`reservedCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`unavailableCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD \`seatCount\` int UNSIGNED NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`total\` int UNSIGNED NOT NULL DEFAULT '0'`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`unique_shopId\` ON \`seat\` (\`shopId\`)`);
  }
}
