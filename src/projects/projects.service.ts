import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>) {}

    async collaborators(id: string) {
        const project = await this.projectsRepository.findOne(id)
        return project.collaborators;
    }
}

