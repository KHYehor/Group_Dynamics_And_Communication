import {MigrationInterface, QueryRunner} from "typeorm";

export class GroupsMigrations1604514126693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Groups(
                id              SERIAL  NOT NULL PRIMARY KEY,
                university_id   SERIAL  NOT NULL REFERENCES Universities(id) ON DELETE CASCADE,
                name            TEXT    NOT NULL UNIQUE 
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DROP TABLE Groups IF EXISTS;
        `);
    }

}
