import {Controller, Get, Res, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseExportData } from './interfaces/response';
import { ExportDataService } from "./export-data.service";

@Controller('export-data')
export class ExportDataController {
  constructor(private readonly exportDataService: ExportDataService) {}

  @Get()
  async exportData(@Headers('Authorization') token, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseExportData = this.exportDataService.exportData(token);    
    return response.send(responseData);
  }
}
