import {Controller, Get, Res, Query, Headers, HttpException, HttpStatus, Post, Body} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataAddFacultyTeacher, IResponseDataDeleteFacultyTeacher, IResponseDataFacultyTeachers, IResponseDataTeacherRating, IResponseDataTeachers } from './interfaces/response';
import { TeacherService } from "./teacher.service";

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Get(":universityId")
  async getUniversityTeachers(@Headers('Authorization') token, @Query() params, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }       
      
    const responseData: IResponseDataTeachers = this.teacherService.getUniversityTeachers({...params}, token);    
    return response.send(responseData);
  }
  @Get("/rating/:teacherId")
  async getTeacherRating(@Headers('Authorization') token, @Query() params, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
    const responseData: IResponseDataTeacherRating = this.teacherService.getTeacherRating({...params}, token);    
    return response.send(responseData);
  }
  @Get("/faculty-teachers")
  async getFacultyTeachers(@Headers('Authorization') token, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataFacultyTeachers = this.teacherService.getFacultyTeachers(token);    
    return response.send(responseData);
  }
  @Post('/faculty-teachers/add')
  async addFacultyTeacher(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataAddFacultyTeacher = this.teacherService.addFacultyTeacher(body, token);    
    return response.send(responseData);
  }
  @Post('/faculty-teachers/delete')
  async deleteFacultyTeacher(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataDeleteFacultyTeacher = this.teacherService.deleteFacultyTeacher(body, token);    
    return response.send(responseData);
  }
}
