import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED, NOT_FOUND_FACULTIES} from '../common/constants';
import {IResponseDataFaculties} from './interfaces/response';

@Injectable()
export class FacultyService {
  constructor(
    private jwtService: JwtService,
  ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    getFaculties(token: string): IResponseDataFaculties {
    
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user: {role, id}}: IPayload = decoded;
      if(!["ADMIN", "LOCAL_ADMIN"].includes(role))  {
          throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      const user = global.getUserById(id);
      
      const faculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
      if(faculties.length<1) {
        throw new HttpException(NOT_FOUND_FACULTIES, HttpStatus.BAD_REQUEST); 
      }

  return faculties;
    }
    
}
