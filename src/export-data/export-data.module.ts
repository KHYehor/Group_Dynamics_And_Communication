import { Module } from '@nestjs/common';
import { ExportDataService } from './export-data.service';
import { ExportDataController } from './export-data.controller';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [AuthModule, PassportModule],
  providers: [ExportDataService, AuthModule],
  controllers: [ExportDataController],
})
export class ExportDataModule {}
