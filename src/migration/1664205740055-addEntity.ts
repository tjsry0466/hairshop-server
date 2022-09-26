import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntity1664205740055 implements MigrationInterface {
  name = 'addEntity1664205740055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`review\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`authorId\` int UNSIGNED NOT NULL, 
      \`menuId\` int UNSIGNED NOT NULL, 
      \`designerId\` int UNSIGNED NOT NULL, 
      \`content\` text NOT NULL, 
      \`star\` int UNSIGNED NOT NULL, 
      \`visitCount\` int UNSIGNED NULL, 
      \`photoUrls\` text NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      \`userId\` int NULL, 
      INDEX \`authorId\` (\`authorId\`), 
      INDEX \`menuId\` (\`menuId\`), 
      INDEX \`designerId\` (\`designerId\`), 
      UNIQUE INDEX \`unique_author_menu_designer\` (\`authorId\`, \`menuId\`, \`designerId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`review_comment\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`reviewId\` int UNSIGNED NOT NULL, 
      \`designerId\` int UNSIGNED NOT NULL, 
      \`content\` text NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`reviewId\` (\`reviewId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`designer\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`email\` varchar(255) NOT NULL, 
      \`password\` varchar(255) NOT NULL, 
      \`shopId\` int UNSIGNED NULL, 
      \`nickname\` varchar(100) NOT NULL, 
      \`level\` enum ('CHIEF', 'HEAD') NOT NULL, 
      \`profileUrl\` varchar(255) NOT NULL, 
      \`thumbnailProfileUrl\` varchar(255) NULL, 
      \`shortIntro\` varchar(100) NOT NULL, 
      \`longIntro\` varchar(255) NULL, 
      \`careerYear\` int UNSIGNED NOT NULL DEFAULT '1', 
      \`regularHoliday\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, 
      \`styleCount\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`likeCount\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`reviewCount\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`email\` (\`email\`), 
      INDEX \`shopId\` (\`shopId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`like_designer\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`userId\` int UNSIGNED NOT NULL, 
      \`designerId\` int UNSIGNED NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      UNIQUE INDEX \`unique_user_designer\` (\`userId\`, \`designerId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`like_shop\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`userId\` int UNSIGNED NOT NULL, 
      \`shopId\` int UNSIGNED NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      INDEX \`shopId\` (\`shopId\`), 
      UNIQUE INDEX \`unique_user_like_shop\` (\`userId\`, \`shopId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`email\` varchar(255) NOT NULL, 
      \`password\` varchar(255) NOT NULL, 
      \`name\` varchar(20) NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`email\` (\`email\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`userId\` int UNSIGNED NOT NULL, 
      \`shopId\` int UNSIGNED NOT NULL, 
      \`menuId\` int UNSIGNED NOT NULL, 
      \`row\` int UNSIGNED NOT NULL, 
      \`column\` int UNSIGNED NOT NULL, 
      \`startTime\` date NOT NULL, 
      \`endTime\` date NOT NULL, 
      \`requireMinute\` int UNSIGNED NOT NULL, 
      \`isDone\` tinyint NOT NULL, 
      \`isCanceled\` tinyint NOT NULL, 
      \`isDelayed\` tinyint NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`userId\` (\`userId\`), 
      INDEX \`shopId\` (\`shopId\`), 
      INDEX \`index_user_shop\` (\`userId\`, \`shopId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`length_option\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`menuId\` int UNSIGNED NOT NULL, 
      \`type\` varchar(255) NOT NULL, 
      \`name\` varchar(255) NOT NULL, 
      \`order\` int UNSIGNED NOT NULL, 
      \`extraPrice\` int UNSIGNED NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      INDEX \`menuId\` (\`menuId\`), 
      UNIQUE INDEX \`unique_menu_name\` (\`menuId\`, \`name\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menu\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`shopId\` int UNSIGNED NOT NULL, 
      \`includeCutOption\` tinyint NOT NULL DEFAULT 0, 
      \`includeShampooOption\` tinyint NOT NULL DEFAULT 0, 
      \`description\` varchar(255) NULL, 
      \`discountRate\` int UNSIGNED NULL, 
      \`requireMinute\` int NULL, 
      \`gender\` enum ('MALE', 'FEMALE') NULL, 
      \`imagesUrls\` text NULL, 
      \`normalPrice\` int UNSIGNED NOT NULL, 
      \`salesPrice\` int UNSIGNED NOT NULL, 
      \`likeCount\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`shopId\` (\`shopId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`designer_menu\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`shopId\` int UNSIGNED NOT NULL, 
      \`designerId\` int UNSIGNED NOT NULL, 
      \`menuId\` int UNSIGNED NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      INDEX \`shopId\` (\`shopId\`), 
      INDEX \`designerMenu\` (\`designerId\`), 
      UNIQUE INDEX \`unique_shop_designer_menu\` (\`shopId\`, \`designerId\`, \`menuId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`seat\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`shopId\` int UNSIGNED NOT NULL, 
      \`seat\` text NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      INDEX \`shopId\` (\`shopId\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shop\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`ownerId\` int UNSIGNED NOT NULL, 
      \`name\` varchar(255) NOT NULL, 
      \`branchName\` varchar(255) NOT NULL, 
      \`intro\` varchar(255) NOT NULL, 
      \`additionalInfos\` text NULL, 
      \`imageUrls\` text NOT NULL, 
      \`offDay\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, 
      \`latitude\` int NULL, 
      \`longitude\` int NULL, 
      \`locationDescription\` varchar(255) NULL, 
      \`address\` varchar(255) NOT NULL, 
      \`safeNumber\` varchar(30) NULL, 
      \`reviewCount\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`reviewRating\` int UNSIGNED NOT NULL DEFAULT '0', 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`ownerId\` (\`ownerId\`), 
      INDEX \`name\` (\`name\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`email\` varchar(255) NOT NULL, 
      \`password\` varchar(255) NOT NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, 
      INDEX \`email\` (\`email\`), 
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`email\` ON \`admin\``);
    await queryRunner.query(`DROP TABLE \`admin\``);
    await queryRunner.query(`DROP INDEX \`name\` ON \`shop\``);
    await queryRunner.query(`DROP INDEX \`ownerId\` ON \`shop\``);
    await queryRunner.query(`DROP TABLE \`shop\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`seat\``);
    await queryRunner.query(`DROP TABLE \`seat\``);
    await queryRunner.query(`DROP INDEX \`unique_shop_designer_menu\` ON \`designer_menu\``);
    await queryRunner.query(`DROP INDEX \`designerMenu\` ON \`designer_menu\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`designer_menu\``);
    await queryRunner.query(`DROP TABLE \`designer_menu\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`menu\``);
    await queryRunner.query(`DROP TABLE \`menu\``);
    await queryRunner.query(`DROP INDEX \`unique_menu_name\` ON \`length_option\``);
    await queryRunner.query(`DROP INDEX \`menuId\` ON \`length_option\``);
    await queryRunner.query(`DROP TABLE \`length_option\``);
    await queryRunner.query(`DROP INDEX \`index_user_shop\` ON \`reservation\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`reservation\``);
    await queryRunner.query(`DROP INDEX \`userId\` ON \`reservation\``);
    await queryRunner.query(`DROP TABLE \`reservation\``);
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`unique_user_like_shop\` ON \`like_shop\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`like_shop\``);
    await queryRunner.query(`DROP TABLE \`like_shop\``);
    await queryRunner.query(`DROP INDEX \`unique_user_designer\` ON \`like_designer\``);
    await queryRunner.query(`DROP TABLE \`like_designer\``);
    await queryRunner.query(`DROP INDEX \`shopId\` ON \`designer\``);
    await queryRunner.query(`DROP INDEX \`email\` ON \`designer\``);
    await queryRunner.query(`DROP TABLE \`designer\``);
    await queryRunner.query(`DROP INDEX \`reviewId\` ON \`review_comment\``);
    await queryRunner.query(`DROP TABLE \`review_comment\``);
    await queryRunner.query(`DROP INDEX \`unique_author_menu_designer\` ON \`review\``);
    await queryRunner.query(`DROP INDEX \`designerId\` ON \`review\``);
    await queryRunner.query(`DROP INDEX \`menuId\` ON \`review\``);
    await queryRunner.query(`DROP INDEX \`authorId\` ON \`review\``);
    await queryRunner.query(`DROP TABLE \`review\``);
  }
}
