import { Module } from '@nestjs/common';
import { AssignmentModule } from './assignment/assignment.module';
import { AuthModule } from './auth/auth.module';
import { CreateModule } from './create/create.module';

@Module({
  imports: [
    AuthModule,
    AssignmentModule,
    // CreateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
