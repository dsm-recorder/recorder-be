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
        private readonly projectMapper: ProjectMapper
    ) {}

    async queryProjectByUserIdAndRepositoryName(
        userId: string,
        repositoryName: string
    ): Promise<Project> {
        return this.projectMapper.toDomain(
            await this.projectRepository.findOneBy({
                user: { id: userId },
                githubOwnerRepository: repositoryName
            })
        );
    }

    async saveProject(project: Project): Promise<Project> {
        const entity = await this.projectMapper.toEntity(project);

        return this.projectMapper.toDomain(
            await this.projectRepository.save(entity)
        );
    }

    async queryProjectsByUserId(userId: string): Promise<Project[]> {
        const projects = await this.projectRepository.find({
            where: {
                user: { id: userId }
            },
            relations: {
                user: true
            }
        });

        return Promise.all(
            projects.map(async (project) =>
                await this.projectMapper.toDomain(project)
            )
        );
    }

    async queryProjectById(projectId: string): Promise<Project> {
        return await this.projectMapper.toDomain(
            await this.projectRepository.findOne({
                where: {
                    id: projectId
                },
                relations: {
                    user: true
                }
            })
        );
    }
}