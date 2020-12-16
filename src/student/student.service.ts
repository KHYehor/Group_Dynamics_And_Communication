import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {FIELDS_REQUEST, NOT_AUTHORIZED, NOT_FOUND_FACULTY_STUDENTS, STUDENT_ALREADY_EXISTS} from '../common/constants';
import {IResponseDataAddStudent, IResponseDataStudents, IStudents} from './interfaces/response';
import { randomID } from '../common/random-id';

@Injectable()
export class StudentService {
  constructor(
    private jwtService: JwtService,
  ) {}

    getFacultyStudents(token: string): IResponseDataStudents {
    
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
      const students = global.getStudentsByFaculties(faculties);
      if(students.length<1) {
        throw new HttpException(NOT_FOUND_FACULTY_STUDENTS, HttpStatus.BAD_REQUEST); 
      }
    const mappedStudents: IStudents = students.map(student => ({
        id: student.id,
        username: student.username
    }));

  return mappedStudents;
    }
    addFacultyStudent(body, token: string): IResponseDataAddStudent {
    
        const decoded = this.jwtService.decode(token);
            // @ts-ignore
        const {user: {role}, university:{id: universityId}}: IPayload = decoded;
        
        if(!["LOCAL_ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        const {studentUsername, faculty, group} = body;
        if(!studentUsername || !faculty || !group)  {
            throw new HttpException(FIELDS_REQUEST, HttpStatus.BAD_REQUEST);
        }
        //@ts-ignore
        const student = global.getStudentByUsername(studentUsername);
        if(student)  {
            throw new HttpException(STUDENT_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
        
        //@ts-ignore
        const u = global.getUniversityById(universityId);
        
        const newStudent = {
          id: randomID(),
          university: u?.uid,
          username: studentUsername,
          login: randomID(),
          password: randomID(),
          role: 'STUDENT',
          faculty,
          group
        }
         //@ts-ignore
        global.addStudent(newStudent); 
  
    return true;
      }
      deleteFacultyStudent(body, token: string): IResponseDataAddStudent {
    
        const decoded = this.jwtService.decode(token);
            // @ts-ignore
        const {user: {role}}: IPayload = decoded;
        
        if(!["LOCAL_ADMIN"].includes(role))  {
            throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        const {studentId} = body;
      
        //@ts-ignore
        const student = global.getStudentById(studentId);
        if(!student)  {
            return true;
        }
        //@ts-ignore

        global.deleteStudent(studentId);         

  
    return true;
      }
}
