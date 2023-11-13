import { Injectable } from '@nestjs/common';
import { ProjectPort } from '../../../../application/domain/project/spi/project.spi';
import { Project } from '../../../../application/domain/project/project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectMapper } from './project.mapper';
import { PublishedProjectResponse } from '../../../../application/domain/pr_record/dto/pr-record.dto';

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

    async queryProjectsByPublished(published: boolean): Promise<PublishedProjectResponse[]> {
        const projects = await this.projectRepository.createQueryBuilder('project')
            .select('project.id', 'id')
            .addSelect('project.name', 'name')
            .addSelect('project.createdAt', 'createdAt')
            .addSelect('project.finishDate', 'finishDate')
            .innerJoinAndSelect('project.user', 'user')
            .where('project.isPublished = :published', { published })
            .getRawMany();

        return projects.map((project): PublishedProjectResponse => {
            return {
                id: project.id,
                name: project.name,
                startDate: project.startDate,
                finishDate: project.finishDate,
                userAccountId: project.user_github_account_id,
                userProfileUrl: project.user_profile_url,
                likeCount: 10
            };
        });
    }
}