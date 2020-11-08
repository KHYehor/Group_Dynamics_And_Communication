import { Controller, Get } from '@nestjs/common';

@Controller('assigment')
export class AssignmentController {
  @Get('active')
  getAssignments(): void {

  }

  @Get('finished')
  getFinishedAssignments(): void {

  }

  @Get('all')
  getAllAssignments(): void {

  }
}
