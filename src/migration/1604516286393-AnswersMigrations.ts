import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswersMigrations1604516286393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            CREATE TABLE IF NOT EXISTS Answers(
                question_id      SERIAL         NOT NULL     REFERENCES      Questions(id)                  ON DELETE CASCADE,
                assignment_id    SERIAL         NOT NULL     REFERENCES      finished_assignments(id)       ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            DROP TABLE Answers IF EXISTS; 
        `);
    }

}
