import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsGateway } from './projects.gateway';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,ProjectsGateway]
})
export class ProjectsModule {}
