import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionsMigrations1604516191056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Questions (
                id      SERIAL  NOT NULL PRIMARY KEY,
                name    text    NOT NULL UNIQUE 
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DROP TABLE Questions IF EXISTS; 
        `);
    }

}
