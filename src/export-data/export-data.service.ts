import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED, NOT_FOUND_USERS} from '../common/constants';
import {IResponseExportData} from './interfaces/response';

const getData = (role: 'ADMIN' | 'LOCAL_ADMIN', faculties: string[]):string => {
    switch(role){
        case 'ADMIN':
            //@ts-ignore 
          return  global.getExportData('LOCAL_ADMIN', faculties);
        case 'LOCAL_ADMIN': {
            //@ts-ignore 
            const studentsData = global.getExportData('STUDENT', faculties);
            //@ts-ignore 
            const teacherssData = global.getExportData('TEACHER', faculties);
            return `${studentsData}\n${teacherssData}`
        }
    }
}

@Injectable()
export class ExportDataService {
  constructor(
    private jwtService: JwtService,
  ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    exportData(token: string): IResponseExportData {
    
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user: {role, id}}: IPayload = decoded;
      if(!["ADMIN", "LOCAL_ADMIN"].includes(role))  {
          throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      const user = global.getUserById(id);
      
      const faculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
      let exportedData = getData(user.role, faculties);
      if(exportedData==='') {
        throw new HttpException(NOT_FOUND_USERS, HttpStatus.BAD_REQUEST); 
      }

  return exportedData;

    }
    
}
