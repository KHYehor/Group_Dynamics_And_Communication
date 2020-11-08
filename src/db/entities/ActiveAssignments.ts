import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Users } from "./Users";

@Entity("active_assignments", { schema: "public" })
export class ActiveAssignments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Users, (users) => users.activeAssignments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "id" }])
  student: Users;

  @ManyToOne(() => Users, (users) => users.activeAssignments2, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "teacher_id", referencedColumnName: "id" }])
  teacher: Users;
}
