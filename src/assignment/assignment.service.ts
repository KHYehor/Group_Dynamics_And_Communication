import {Injectable} from '@nestjs/common';
import {IJWTUser} from "../common/interfaces/user";
import {IAssignments} from "./interface/assignments";
import {ActiveAssignments} from "../db/entities/ActiveAssignments";
import {FinishedAssignments} from "../db/entities/FinishedAssignments";
import {Repository} from "typeorm";


@Injectable()
export class AssignmentService {
  async getAssignments(user: IJWTUser, role: IAssignments) {
    switch (role) {
      case IAssignments.active:
        return this.getActiveAssignments(user);
      case IAssignments.finished:
        return this.getFinishedAssignments(user);
      case IAssignments.all:
        return this.getAllAssignments(user);
      default:
        return null;
    }
  }

  private async getActiveAssignments(user: IJWTUser): Promise<void> {
    // return this.finishedAssignmentsRepository.find({
    //   join: { alias: 'assignments', innerJoin: { user: 'assignments.student' } },
    //   where: qb => qb.where('student.id = :studentId', { studentId: user.userId })
    // })
  }

  private async getFinishedAssignments(user: IJWTUser): Promise<void> {
    // const result = await this.finishedAssignmentsRepository.find({
    //   join: {
    //     alias: 'assignments', innerJoin: {
    //       student: 'assignments.student',
    //       teacher: 'assignments.teacher',
    //       answers: 'assignments.answers',
    //     }
    //   },
    //   where: qb => qb.where(`student.id = :studentId`, { studentId: user.userId })
    // });
    // console.log(result);
    // return result;
  }

  private async getAllAssignments(user: IJWTUser): Promise<void> {
    // const [active, finish] = await Promise.all([
    //   this.finishedAssignmentsRepository.find({
    //     join: { alias: 'assignments', innerJoin: { user: 'assignments.student' } },
    //     where: qb => qb.where('student.id = :studentId', { studentId: user.userId })
    //   }),
    //   this.finishedAssignmentsRepository.find({
    //     join: { alias: 'assignments', innerJoin: { user: 'assignments.student' } },
    //     where: qb => qb.where('student.id = :studentId', { studentId: user.userId })
    //   }),
    // ]);
    // return [...active, ...finish];
  }
}
