import {Controller, Get, Res, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataGroups } from './interfaces/response';
import { GroupService } from "./group.service";

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getGroups(@Headers('Authorization') token, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataGroups = this.groupService.getGroups(token);    
    return response.send(responseData);
  }
}
