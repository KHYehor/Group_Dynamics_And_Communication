import { Module } from '@nestjs/common';
import { AssignmentModule } from './assignment/assignment.module';
import { AuthModule } from './auth/auth.module';
import { CreateModule } from './create/create.module';
import { ExportDataModule } from './export-data/export-data.module';
import { FacultyModule } from './faculty/faculty.module';
import { GroupModule } from './group/group.module';
import { LocalAdminModule } from './local-admin/local-admin.module';
import { ReviewModule } from './review/review.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    AuthModule,
    //AssignmentModule,
    ExportDataModule,
    FacultyModule,
    GroupModule,
    LocalAdminModule,
    UniversityModule,
    StudentModule,
    TeacherModule,
    ReviewModule
    // CreateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
