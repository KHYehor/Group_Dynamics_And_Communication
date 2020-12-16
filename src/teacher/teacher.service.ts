import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {FIELDS_REQUEST, NOT_AUTHORIZED, NOT_FOUND_FACULTY_TEACHERS,NOT_FOUND_UNIVERSITY_TEACHERS, TEACHER_ALREADY_EXISTS} from '../common/constants';
import { IResponseDataAddFacultyTeacher, IResponseDataDeleteFacultyTeacher, IResponseDataFacultyTeachers, IResponseDataTeacherRating, ITeacher, ITeachers } from './interfaces/response';
import { randomID } from '../common/random-id';

@Injectable()
export class TeacherService {
  constructor(
    private jwtService: JwtService,
  ) {}

  getTeacherRating(params, token: string): IResponseDataTeacherRating {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}, university: {id}}: IPayload = decoded;
    
    if(!["LOCAL_ADMIN", 'ADMIN', 'STUDENT', 'TEACHER'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {teacherId} = params;
    //@ts-ignore
    const teacher = global.getTeacherById(teacherId);

return teacher.rating;
  }

  getUniversityTeachers(params, token: string): IResponseDataFacultyTeachers {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}}: IPayload = decoded;
    
    if(!["LOCAL_ADMIN", 'ADMIN', 'STUDENT', 'TEACHER'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {universityId} = params;
    
    //@ts-ignore
    const u = global.getUniversityById(universityId); 
    //@ts-ignore
    const teachers = global.getTeachersByUniversityUid(u?.uid);
    if(teachers.length<1) {
      throw new HttpException(NOT_FOUND_UNIVERSITY_TEACHERS, HttpStatus.BAD_REQUEST); 
    }
  const mappedTeachers: ITeachers = teachers.map((teacher): ITeacher => ({
      id: teacher.id,
      username: teacher.username,
      rating: teacher.rating,
  }));

return mappedTeachers;
  }

    getFacultyTeachers(token: string): IResponseDataFacultyTeachers {
    
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
      const teachers = global.getTeachersByFaculties(faculties);
      if(teachers.length<1) {
        throw new HttpException(NOT_FOUND_FACULTY_TEACHERS, HttpStatus.BAD_REQUEST); 
      }
    const mappedTeachers: ITeachers = teachers.map((teacher): ITeacher => ({
        id: teacher.id,
        username: teacher.username,
        rating: teacher.rating,
    }));

  return mappedTeachers;
    }
    addFacultyTeacher(body, token: string): IResponseDataAddFacultyTeacher {
    
        const decoded = this.jwtService.decode(token);
            // @ts-ignore
        const {user: {role}, university:{id: universityId}}: IPayload = decoded;
        
        if(!["LOCAL_ADMIN", "ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        const {teacherUsername, faculties} = body;
        if(!teacherUsername || !Array.isArray(faculties) || faculties.length<1)  {
            throw new HttpException(FIELDS_REQUEST, HttpStatus.BAD_REQUEST);
        }
        //@ts-ignore
        const teacher = global.getTeacherByUsername(teacherUsername);
        if(teacher)  {
            throw new HttpException(TEACHER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
        
        //@ts-ignore
        const u = global.getUniversityById(universityId);
        
        const newTeacher = {
          id: randomID(),
          rating: 0,
          university: u?.uid,
          username: teacherUsername,
          login: randomID(),
          password: randomID(),
          role: 'TEACHER',
          faculty: faculties,
          //@ts-ignore
          group: global.getGroupsByFaculties(faculties),
        }
         //@ts-ignore
        global.addTeacher(newTeacher); 
  
    return true;
      }
      deleteFacultyTeacher(body, token: string): IResponseDataDeleteFacultyTeacher {
    
        const decoded = this.jwtService.decode(token);
            // @ts-ignore
        const {user: {role}}: IPayload = decoded;
        
        if(!["LOCAL_ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        const {teacherId} = body;
      
        //@ts-ignore
        const teacher = global.getTeacherById(teacherId);
        if(!teacher)  {
            return true;
        }
        //@ts-ignore

        global.deleteTeacher(teacherId);         

  
    return true;
      }
}
