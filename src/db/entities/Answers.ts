import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { FinishedAssignments } from "./FinishedAssignments";
import { Questions } from "./Questions";

@Entity("answers", { schema: "public" })
export class Answers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => FinishedAssignments,
    (finishedAssignments) => finishedAssignments.answers,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "assignment_id", referencedColumnName: "id" }])
  assignment: FinishedAssignments;

  @ManyToOne(() => Questions, (questions) => questions.answers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Questions;
}
