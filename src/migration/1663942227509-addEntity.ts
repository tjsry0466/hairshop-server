import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntity1663942227509 implements MigrationInterface {
  name = 'addEntity1663942227509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`review_comment\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`reviewId\` int NOT NULL, 
        \`designerId\` int NOT NULL, 
        \`content\` text NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`like_shop\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`userId\` int NOT NULL, 
        \`shopId\` int NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`like_designer\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`userId\` int NOT NULL, 
        \`designerId\` int NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`designer\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`username\` varchar(100) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`shopId\` int NULL, 
        \`nickname\` varchar(100) NOT NULL, 
        \`level\` enum ('CHIEF', 'HEAD') NOT NULL, 
        \`profileUrl\` varchar(255) NOT NULL, 
        \`thumbnailProfileUrl\` varchar(255) NULL, 
        \`shortIntro\` varchar(100) NOT NULL, 
        \`longIntro\` varchar(255) NULL, 
        \`careerYear\` int NOT NULL DEFAULT '1', 
        \`regularHoliday\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, \`styleCount\` int NOT NULL DEFAULT '0', \`likeCount\` int NOT NULL DEFAULT '0', \`reviewCount\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        INDEX \`shopId\` (\`shopId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`review\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`authorId\` int NOT NULL, 
        \`menuId\` int NOT NULL, 
        \`designerId\` int NOT NULL, 
        \`content\` text NOT NULL, 
        \`star\` int NOT NULL, 
        \`visitCount\` int NULL, 
        \`photoUrls\` varchar(255) array NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        \`userId\` int NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`length_option\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`menuId\` int NOT NULL, 
        \`type\` varchar(255) NOT NULL, 
        \`name\` varchar(255) NOT NULL, 
        \`order\` int NOT NULL, 
        \`extraPrice\` int NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        INDEX \`menuId\` (\`menuId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menu\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`shopId\` int NOT NULL, 
        \`includeCutOption\` tinyint NOT NULL DEFAULT 0, 
        \`includeShampooOption\` tinyint NOT NULL DEFAULT 0, 
        \`description\` varchar(255) NULL, 
        \`discountRate\` int NULL, 
        \`requireMinute\` int NULL, 
        \`gender\` enum ('MALE', 'FEMALE') NULL, 
        \`imagesUrls\` varchar(255) array NULL, 
        \`normalPrice\` int NOT NULL, 
        \`salesPrice\` int NOT NULL, 
        \`likeCount\` int NOT NULL DEFAULT '0', 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        INDEX \`shopId\` (\`shopId\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`designer_menu\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`shopId\` int NOT NULL, 
        \`designerId\` int NOT NULL, 
        \`menuId\` int NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shop\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`ownerId\` int NOT NULL, 
        \`name\` varchar(255) NOT NULL, 
        \`branchName\` varchar(255) NOT NULL, 
        \`intro\` varchar(255) NOT NULL, 
        \`additionalInfos\` varchar(255) array NULL, 
        \`imageUrls\` varchar(255) array NOT NULL, 
        \`offDay\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, 
        \`latitude\` int NULL, 
        \`longitude\` int NULL, 
        \`locationDescription\` varchar(255) NULL, 
        \`address\` varchar(255) NOT NULL, 
        \`safeNumber\` varchar(30) NULL, 
        \`reviewCount\` int NOT NULL DEFAULT '0', 
        \`reviewRating\` int NOT NULL DEFAULT '0', 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`username\` varchar(100) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`DROP TABLE \`admin\``);
    await queryRunner.query(`DROP TABLE \`shop\``);
    await queryRunner.query(`DROP TABLE \`designer_menu\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`menu\``);
    await queryRunner.query(`DROP TABLE \`menu\``);
    await queryRunner.query(`DROP INDEX \`menuId\` ON \`length_option\``);
    await queryRunner.query(`DROP TABLE \`length_option\``);
    await queryRunner.query(`DROP TABLE \`review\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`designer\``);
    await queryRunner.query(`DROP TABLE \`designer\``);
    await queryRunner.query(`DROP TABLE \`like_designer\``);
    await queryRunner.query(`DROP TABLE \`like_shop\``);
    await queryRunner.query(`DROP TABLE \`review_comment\``);
  }
}
