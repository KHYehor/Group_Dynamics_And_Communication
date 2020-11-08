import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./Groups";
import { Users } from "./Users";

@Index("universities_pkey", ["id"], { unique: true })
@Index("universities_name_key", ["name"], { unique: true })
@Entity("universities", { schema: "public" })
export class Universities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", unique: true })
  name: string;

  @OneToMany(() => Groups, (groups) => groups.university)
  groups: Groups[];

  @OneToMany(() => Users, (users) => users.university)
  users: Users[];
}
