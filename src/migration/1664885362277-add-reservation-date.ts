import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReservationDate1664885362277 implements MigrationInterface {
  name = 'addReservationDate1664885362277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`reservationDate\` date NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`reservationDate\``);
  }
}
