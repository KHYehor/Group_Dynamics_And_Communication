import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [AssignmentService, AuthModule],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
