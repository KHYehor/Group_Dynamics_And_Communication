import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Universities } from "./Universities";
import { Users } from "./Users";

@Index("groups_pkey", ["id"], { unique: true })
@Index("groups_name_key", ["name"], { unique: true })
@Entity("groups", { schema: "public" })
export class Groups {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", unique: true })
  name: string;

  @ManyToOne(() => Universities, (universities) => universities.groups, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "university_id", referencedColumnName: "id" }])
  university: Universities;

  @OneToMany(() => Users, (users) => users.group)
  users: Users[];
}
