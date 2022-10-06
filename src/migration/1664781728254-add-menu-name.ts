import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMenuName1664781728254 implements MigrationInterface {
  name = 'addMenuName1664781728254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`menu\` ADD \`name\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`name\``);
  }
}
