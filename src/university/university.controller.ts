import {Controller, Get, Res, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataUniversities } from './interfaces/response';
import { UniversityService } from "./university.service";

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  async getUniversities(@Headers('Authorization') token, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataUniversities = this.universityService.getUniversities(token);    
    return response.send(responseData);
  }
}
