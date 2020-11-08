import { Module } from '@nestjs/common';
import { ControllerService } from './controller/controller.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [ControllerService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
