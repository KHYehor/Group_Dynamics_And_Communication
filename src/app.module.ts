import { Module } from '@nestjs/common';
import { AssignmentModule } from './assignment/assignment.module';
import { AuthModule } from './auth/auth.module';
import { CreatorModule } from './creator/creator.module';

@Module({
  imports: [AssignmentModule, AuthModule, CreatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
