import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUnavailableCount1664474135217 implements MigrationInterface {
    name = 'modifyUnavailableCount1664474135217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seat\` CHANGE \`availableCount\` \`unavailableCount\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seat\` CHANGE \`unavailableCount\` \`availableCount\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

}
