import {Controller, Get, Res, Headers, HttpException, HttpStatus, Post, Body} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataAddStudent, IResponseDataDeleteStudent, IResponseDataStudents } from './interfaces/response';
import { StudentService } from "./student.service";

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("/faculty-students")
  async getFacultyStudents(@Headers('Authorization') token, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataStudents = this.studentService.getFacultyStudents(token);    
    return response.send(responseData);
  }
  @Post('/faculty-students/add')
  async addFacultyStudent(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataAddStudent = this.studentService.addFacultyStudent(body, token);    
    return response.send(responseData);
  }
  @Post('/faculty-students/delete')
  async deleteFacultyStudent(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataDeleteStudent = this.studentService.deleteFacultyStudent(body, token);    
    return response.send(responseData);
  }
}
