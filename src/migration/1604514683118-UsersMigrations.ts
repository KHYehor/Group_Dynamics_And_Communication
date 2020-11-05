import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersMigrations1604514683118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TYPE role AS ENUM ('admin', 'student', 'teacher');
            
            CREATE TABLE IF NOT EXISTS Users(
                id              SERIAL         NOT NULL     PRIMARY KEY,
                university_id   SERIAL         NOT NULL     REFERENCES      Universities(id)    ON DELETE CASCADE,
                group_id        SERIAL                      REFERENCES      Groups(id)          ON DELETE CASCADE,
                first_name      VARCHAR(64)    NOT NULL, 
                second_name     VARCHAR(64)    NOT NULL, 
                third_name      VARCHAR(64)    NOT NULL,
                photo_url       VARCHAR(256)   NOT NULL,
                role            role           NOT NULL,
                login           VARCHAR(256)   NOT NULL,
                password        VARCHAR(256)   NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            DROP TABLE Users IF EXISTS;
            DROP TYPE role IF EXISTS;
        `);
    }

}
