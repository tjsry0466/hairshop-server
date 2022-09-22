import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUser1663855882852 implements MigrationInterface {
  name = 'addUser1663855882852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`email\` varchar(255) NOT NULL, 
      \`password\` varchar(255) NULL, 
      \`name\` varchar(20) NOT NULL, 
      \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
