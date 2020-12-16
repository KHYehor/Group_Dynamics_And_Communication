import {Controller, Get, Res, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataFaculties } from './interfaces/response';
import { FacultyService } from "./faculty.service";

@Controller('faculties')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  async getFaculties(@Headers('Authorization') token, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataFaculties = this.facultyService.getFaculties(token);    
    return response.send(responseData);
  }
}
