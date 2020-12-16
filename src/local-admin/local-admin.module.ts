import { Module } from '@nestjs/common';
import { LocalAdminService } from './local-admin.service';
import { LocalAdminController } from './local-admin.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [LocalAdminService, AuthModule],
  controllers: [LocalAdminController],
})
export class LocalAdminModule {}
