import {MigrationInterface, QueryRunner} from "typeorm";

export class Refactor1604677301203 implements MigrationInterface {
    name = 'Refactor1604677301203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."questions" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_f514d9a61ce002bb93262de547c" UNIQUE ("name"), CONSTRAINT "PK_d22c14c39d83d62e9abe0e78205" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "questions_name_key" ON "public"."questions" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "questions_pkey" ON "public"."questions" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."answers" ("id" SERIAL NOT NULL, "assignment_id" integer, "question_id" integer, CONSTRAINT "PK_dd5e0327615dcdb3ea5ea7edad6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."finished_assignments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "student_id" integer, "teacher_id" integer, CONSTRAINT "PK_57b16c09abfc027a4a44329ea76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "finished_assignments_pkey" ON "public"."finished_assignments" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."universities" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_8d86ef245192977f714807c0421" UNIQUE ("name"), CONSTRAINT "PK_99096433ef76c0b3ff08cdc9c0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "universities_name_key" ON "public"."universities" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "universities_pkey" ON "public"."universities" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."groups" ("id" SERIAL NOT NULL, "name" text NOT NULL, "university_id" integer, CONSTRAINT "UQ_d99236da9f1d9de862243b4bda1" UNIQUE ("name"), CONSTRAINT "PK_dbdeb86e50882d20da55843e87a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "groups_name_key" ON "public"."groups" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "groups_pkey" ON "public"."groups" ("id") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'student', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "public"."users" ("id" SERIAL NOT NULL, "first_name" character varying(64) NOT NULL, "second_name" character varying(64) NOT NULL, "third_name" character varying(64) NOT NULL, "photo_url" character varying(256) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "login" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, "group_id" integer, "university_id" integer, CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_pkey" ON "public"."users" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."active_assignments" ("id" SERIAL NOT NULL, "student_id" integer, "teacher_id" integer, CONSTRAINT "PK_70e03783ce55b3ef9006621ca48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."answers" ADD CONSTRAINT "FK_6496f118e6bbc5604b66a3801b9" FOREIGN KEY ("assignment_id") REFERENCES "public"."finished_assignments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."answers" ADD CONSTRAINT "FK_319eca9ae843e58fdac91864593" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."finished_assignments" ADD CONSTRAINT "FK_5acfad98980cca1184d6aec6abb" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."finished_assignments" ADD CONSTRAINT "FK_cb8f989b5a9ffc2f652af62db25" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."groups" ADD CONSTRAINT "FK_5a64b86e41e75b587a639eeae2e" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "FK_adba83145ee0574b185c12ecc5d" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "FK_9633997644aa995479172b22711" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."active_assignments" ADD CONSTRAINT "FK_e1d4383ffe828257fcda47dd481" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."active_assignments" ADD CONSTRAINT "FK_2f2f2088597ddedeac682da7641" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."active_assignments" DROP CONSTRAINT "FK_2f2f2088597ddedeac682da7641"`);
        await queryRunner.query(`ALTER TABLE "public"."active_assignments" DROP CONSTRAINT "FK_e1d4383ffe828257fcda47dd481"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "FK_9633997644aa995479172b22711"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "FK_adba83145ee0574b185c12ecc5d"`);
        await queryRunner.query(`ALTER TABLE "public"."groups" DROP CONSTRAINT "FK_5a64b86e41e75b587a639eeae2e"`);
        await queryRunner.query(`ALTER TABLE "public"."finished_assignments" DROP CONSTRAINT "FK_cb8f989b5a9ffc2f652af62db25"`);
        await queryRunner.query(`ALTER TABLE "public"."finished_assignments" DROP CONSTRAINT "FK_5acfad98980cca1184d6aec6abb"`);
        await queryRunner.query(`ALTER TABLE "public"."answers" DROP CONSTRAINT "FK_319eca9ae843e58fdac91864593"`);
        await queryRunner.query(`ALTER TABLE "public"."answers" DROP CONSTRAINT "FK_6496f118e6bbc5604b66a3801b9"`);
        await queryRunner.query(`DROP TABLE "public"."active_assignments"`);
        await queryRunner.query(`DROP INDEX "public"."users_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."groups_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."groups_name_key"`);
        await queryRunner.query(`DROP TABLE "public"."groups"`);
        await queryRunner.query(`DROP INDEX "public"."universities_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."universities_name_key"`);
        await queryRunner.query(`DROP TABLE "public"."universities"`);
        await queryRunner.query(`DROP INDEX "public"."finished_assignments_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."finished_assignments"`);
        await queryRunner.query(`DROP TABLE "public"."answers"`);
        await queryRunner.query(`DROP INDEX "public"."questions_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."questions_name_key"`);
        await queryRunner.query(`DROP TABLE "public"."questions"`);
    }

}
