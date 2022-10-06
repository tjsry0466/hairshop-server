import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyRequireMinuteToEstimatedMunites1665063239316 implements MigrationInterface {
  name = 'modifyRequireMinuteToEstimatedMunites1665063239316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` CHANGE \`requireMinute\` \`estimatedMinutes\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menu\` CHANGE \`requireMinute\` \`estimatedMinutes\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menu\` CHANGE \`estimatedMinutes\` \`requireMinute\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` CHANGE \`estimatedMinutes\` \`requireMinute\` int UNSIGNED NOT NULL`,
    );
  }
}
