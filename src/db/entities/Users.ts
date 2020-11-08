import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActiveAssignments } from "./ActiveAssignments";
import { FinishedAssignments } from "./FinishedAssignments";
import { Groups } from "./Groups";
import { Universities } from "./Universities";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "first_name", length: 64 })
  firstName: string;

  @Column("character varying", { name: "second_name", length: 64 })
  secondName: string;

  @Column("character varying", { name: "third_name", length: 64 })
  thirdName: string;

  @Column("character varying", { name: "photo_url", length: 256 })
  photoUrl: string;

  @Column("enum", { name: "role", enum: ["admin", "student", "teacher"] })
  role: "admin" | "student" | "teacher";

  @Column("character varying", { name: "login", length: 256 })
  login: string;

  @Column("character varying", { name: "password", length: 256 })
  password: string;

  @OneToMany(
    () => ActiveAssignments,
    (activeAssignments) => activeAssignments.student
  )
  activeAssignments: ActiveAssignments[];

  @OneToMany(
    () => ActiveAssignments,
    (activeAssignments) => activeAssignments.teacher
  )
  activeAssignments2: ActiveAssignments[];

  @OneToMany(
    () => FinishedAssignments,
    (finishedAssignments) => finishedAssignments.student
  )
  finishedAssignments: FinishedAssignments[];

  @OneToMany(
    () => FinishedAssignments,
    (finishedAssignments) => finishedAssignments.teacher
  )
  finishedAssignments2: FinishedAssignments[];

  @ManyToOne(() => Groups, (groups) => groups.users, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group: Groups;

  @ManyToOne(() => Universities, (universities) => universities.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "university_id", referencedColumnName: "id" }])
  university: Universities;
}
