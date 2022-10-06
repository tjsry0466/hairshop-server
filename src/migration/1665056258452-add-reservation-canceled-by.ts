import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReservationCanceledBy1665056258452 implements MigrationInterface {
  name = 'addReservationCanceledBy1665056258452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`canceledBy\` int UNSIGNED NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`canceledBy\``);
  }
}
