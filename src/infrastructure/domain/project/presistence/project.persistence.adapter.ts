import { Injectable } from '@nestjs/common';
import { ProjectPort } from '../../../../application/domain/project/spi/project.spi';
import { Project } from '../../../../application/domain/project/project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class ProjectPersistenceAdapter implements ProjectPort {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly projectRepository: Repository<ProjectTypeormEntity>,
        private readonly projectMapper: ProjectMapper,
    ) {}

    async saveProject(project: Project): Promise<Project> {
        return this.projectMapper.toDomain(
            await this.projectRepository.save(await this.projectMapper.toEntity(project)),
        );
    }

    async queryProjectsByUserId(userId: string): Promise<Project[]> {
        const projects = await this.projectRepository.findBy({ user: { id: userId } });

        return projects.map((project): Project => {
            return {
                id: project.id,
                userId: project.user.id,
                name: project.name,
                skills: project.skills,
                isPublic: project.isPublic,
                logoUrl: project.logoUrl,
                githubOwnerRepository: project.githubOwnerRepository,
                description: project.description,
                createdAt: project.createdAt,
            };
        });
    }
}
