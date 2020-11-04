import {MigrationInterface, QueryRunner} from "typeorm";

export class ActiveAssigmentsMigrations1604515602200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            CREATE TABLE IF NOT EXISTS active_assignments(
                student_id      SERIAL         NOT NULL     REFERENCES      Users(id)           ON DELETE CASCADE,
                teacher_id      SERIAL         NOT NULL     REFERENCES      Users(id)           ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`            
            DROP TABLE active_assignments IF EXISTS; 
        `);
    }

}
