import {MigrationInterface, QueryRunner} from "typeorm";

export class addNonSeatCount1664473941904 implements MigrationInterface {
    name = 'addNonSeatCount1664473941904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seat\` ADD \`nonSeatCount\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`nonSeatCount\``);
    }

}
