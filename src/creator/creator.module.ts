import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';

@Module({
  providers: [CreatorService],
  controllers: [CreatorController]
})
export class CreatorModule {}
