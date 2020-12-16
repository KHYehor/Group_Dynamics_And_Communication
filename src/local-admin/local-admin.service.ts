import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED,LOCAL_ADMIN_ALREADY_EXISTS,TEACHER_NOT_EXISTS, NOT_FOUND_LOCAL_ADMINS, FIELDS_REQUEST} from '../common/constants';
import {ILocalAdmin, ILocalAdmins, IResponseDataAddLocalAdmin, IResponseDataDeleteLocalAdmin, IResponseDataLocalAdmins} from './interfaces/response';
import { randomID } from '../common/random-id';

@Injectable()
export class LocalAdminService {
  constructor(
    private jwtService: JwtService,
  ) {}

    getLocalAdmins(token: string): IResponseDataLocalAdmins {
    
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user: {role}, university: {id}}: IPayload = decoded;
      if(!["ADMIN"].includes(role))  {
          throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      }
      
      //@ts-ignore
      const localAdmins = global.getLocalAdminsByUniversityId(id);      
      if(localAdmins.length<1) {
        throw new HttpException(NOT_FOUND_LOCAL_ADMINS, HttpStatus.BAD_REQUEST); 
      }
    const mappedLocalAdmins: ILocalAdmins = localAdmins.map((ladmin):ILocalAdmin => ({
        username: ladmin.username,
        id: ladmin.id,
        faculties: ladmin.faculty,
        rating: ladmin.rating
    }))
  return mappedLocalAdmins
    }
    addLocalAdmin(body, token: string): IResponseDataAddLocalAdmin {
        const decoded = this.jwtService.decode(token);
        // @ts-ignore
        const {user: {role}, university: {id}}: IPayload = decoded;
        if(!["ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        //validate body
        const {faculties, localAdminUsername} = body;
        if(!localAdminUsername|| localAdminUsername==='' || !Array.isArray(faculties) || faculties.length < 1)  {
            throw new HttpException(FIELDS_REQUEST, HttpStatus.BAD_REQUEST);
        }
        //@ts-ignore
        const localAdmin = global.getLocalAdminByUsername(localAdminUsername);
        if(localAdmin)  {
            throw new HttpException(LOCAL_ADMIN_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
         //@ts-ignore
         const teacher = global.getTeacherByUsername(localAdminUsername);
         if(!teacher)  {
             throw new HttpException(TEACHER_NOT_EXISTS, HttpStatus.BAD_REQUEST);
         }
         //@ts-ignore
         const newLocalAdmin = {
             ...teacher,
             login: randomID(),
             password: randomID(),
             role: 'LOCAL_ADMIN',
             faculty: faculties,
             //@ts-ignore
             group: global.getGroupsByFaculties(faculties)
         }
         //@ts-ignore
        global.addLocalAdmin(newLocalAdmin);         

    return true;
      }
      deleteLocalAdmin(body, token: string): IResponseDataAddLocalAdmin {
        const decoded = this.jwtService.decode(token);
        // @ts-ignore
        const {user: {role}, university: {id}}: IPayload = decoded;
        if(!["ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        //validate body
        const {localAdminId} = body;
    
        //@ts-ignore
        const localAdmin = global.getLocalAdminById(localAdminId);
        if(!localAdmin)  {
            return true;
        }

         //@ts-ignore
        global.deleteLocalAdmin(localAdminId);         

    return true;
      }
}
