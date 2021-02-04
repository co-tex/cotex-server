import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>) {}

    create(user: User, body: {}) {
        const project = this.projectsRepository
        .create({...body, collaborators: [user]});
        return this.projectsRepository.save(project);
    }
}

