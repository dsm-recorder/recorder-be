import { Injectable } from '@nestjs/common';
import { ProjectPort } from '../../../application/project/spi/project.spi';
import { Project } from '../../../application/project/project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class ProjectPersistenceAdapter implements ProjectPort {
  constructor(
    @InjectRepository(ProjectTypeormEntity)
    private readonly projectRepository: Repository<ProjectTypeormEntity>,
    private readonly projectMapper: ProjectMapper
  ) {}

  async saveProject(project: Project): Promise<Project> {
    return this.projectMapper.toDomain(await this.projectRepository.save(await this.projectMapper.toEntity(project)));
  }
}
