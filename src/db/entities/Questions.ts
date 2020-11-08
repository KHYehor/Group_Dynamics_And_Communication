import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answers } from "./Answers";

@Index("questions_pkey", ["id"], { unique: true })
@Index("questions_name_key", ["name"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", unique: true })
  name: string;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];
}
