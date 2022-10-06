import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueMenu1664782619856 implements MigrationInterface {
  name = 'addUniqueMenu1664782619856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`unique_shopId_name\` ON \`menu\` (\`shopId\`, \`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`unique_shopId_name\` ON \`menu\``);
  }
}
