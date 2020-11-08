import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answers } from "./Answers";
import { Users } from "./Users";

@Index("finished_assignments_pkey", ["id"], { unique: true })
@Entity("finished_assignments", { schema: "public" })
export class FinishedAssignments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Answers, (answers) => answers.assignment)
  answers: Answers[];

  @ManyToOne(() => Users, (users) => users.finishedAssignments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "id" }])
  student: Users;

  @ManyToOne(() => Users, (users) => users.finishedAssignments2, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "teacher_id", referencedColumnName: "id" }])
  teacher: Users;
}
