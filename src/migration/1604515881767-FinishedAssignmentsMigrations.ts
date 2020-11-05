import {MigrationInterface, QueryRunner} from "typeorm";

export class FinishedAssignmentsMigrations1604515881767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            CREATE TABLE IF NOT EXISTS finished_assignments(
                id              SERIAL                      NOT NULL     PRIMARY KEY,
                student_id      SERIAL                      NOT NULL     REFERENCES      Users(id)           ON DELETE CASCADE,
                teacher_id      SERIAL                      NOT NULL     REFERENCES      Users(id)           ON DELETE CASCADE,
                created_at      TIMESTAMP WITH TIME ZONE    NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            DROP TABLE finished_assignments IF EXISTS; 
        `);
    }

}
