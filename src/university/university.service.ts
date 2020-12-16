import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED, NOT_FOUND_UNIVERSITIES} from '../common/constants';
import {IResponseDataUniversities, IUniversities} from './interfaces/response';

@Injectable()
export class UniversityService {
  constructor(
    private jwtService: JwtService,
  ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    getUniversities(token: string): IResponseDataUniversities {
    
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user: {role}}: IPayload = decoded;
      if(!["ADMIN", "LOCAL_ADMIN", 'STUDENT', 'TEACHER'].includes(role))  {
          throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      const universities = global.getAllUniversities();
      
      if(universities.length<1) {
        throw new HttpException(NOT_FOUND_UNIVERSITIES, HttpStatus.BAD_REQUEST); 
      }

      const mappedUniversities : IUniversities = universities.map(univer=> ({
          rating: univer.rating,
          preview: univer.preview,
          name: univer.name,
          id: univer.id
      }))

  return mappedUniversities
    }
    
}
