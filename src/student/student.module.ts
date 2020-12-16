import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [StudentService, AuthModule],
  controllers: [StudentController],
})
export class StudentModule {}
