import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [GroupService, AuthModule],
  controllers: [GroupController],
})
export class GroupModule {}
