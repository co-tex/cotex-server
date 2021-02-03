import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsGateway } from './projects.gateway';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,ProjectsGateway],
  imports: [
    TypeOrmModule.forFeature([Project])
],
})
export class ProjectsModule {}
