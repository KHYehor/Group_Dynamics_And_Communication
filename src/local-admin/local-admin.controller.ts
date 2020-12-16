import {Controller, Get, Res, Headers, HttpException, HttpStatus, Post, Body} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataAddLocalAdmin, IResponseDataDeleteLocalAdmin, IResponseDataLocalAdmins } from './interfaces/response';
import { LocalAdminService } from "./local-admin.service";

@Controller('local-admins')
export class LocalAdminController {
  constructor(private readonly localAdminService: LocalAdminService) {}

  @Get()
  async getGroups(@Headers('Authorization') token, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataLocalAdmins = this.localAdminService.getLocalAdmins(token);    
    return response.send(responseData);
  }
  @Post('/add')
  async addLocalAdmin(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataAddLocalAdmin = this.localAdminService.addLocalAdmin(body, token);    
    return response.send(responseData);
  }
  @Post('/delete')
  async deleteLocalAdmin(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataDeleteLocalAdmin = this.localAdminService.deleteLocalAdmin(body, token);    
    return response.send(responseData);
  }
}
