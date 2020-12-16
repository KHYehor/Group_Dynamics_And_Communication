import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [FacultyService, AuthModule],
  controllers: [FacultyController],
})
export class FacultyModule {}
