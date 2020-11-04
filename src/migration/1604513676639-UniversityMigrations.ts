import {MigrationInterface, QueryRunner} from "typeorm";

export class UniversityMigrations1604513676639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Universities(
                id      SERIAL  NOT NULL PRIMARY KEY,
                name    text    NOT NULL UNIQUE 
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DROP TABLE Universities IF EXISTS; 
        `);
    }

}
