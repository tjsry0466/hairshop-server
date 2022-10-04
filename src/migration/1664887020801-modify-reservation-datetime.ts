import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyReservationDatetime1664887020801 implements MigrationInterface {
  name = 'modifyReservationDatetime1664887020801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`startTime\``);
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`startTime\` datetime NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`endTime\``);
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`endTime\` datetime NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`endTime\``);
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`endTime\` date NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`startTime\``);
    await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`startTime\` date NOT NULL`);
  }
}
