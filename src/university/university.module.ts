import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [UniversityService, AuthModule],
  controllers: [UniversityController],
})
export class UniversityModule {}
