import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED, NOT_FOUND_GROUPS} from '../common/constants';
import {IResponseDataGroups} from './interfaces/response';

@Injectable()
export class GroupService {
  constructor(
    private jwtService: JwtService,
  ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    getGroups(token: string): IResponseDataGroups {
    
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user: {role, id}}: IPayload = decoded;
      if(!["LOCAL_ADMIN"].includes(role))  {
          throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      const user = global.getUserById(id);
      
      const faculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
      //@ts-ignore
      const groups: string[] = global.getGroupsByFaculties(faculties);
      if(groups.length<1) {
        throw new HttpException(NOT_FOUND_GROUPS, HttpStatus.BAD_REQUEST); 
      }

  return groups;
    }
}
