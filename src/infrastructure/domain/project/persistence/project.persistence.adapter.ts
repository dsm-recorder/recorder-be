import { Injectable } from '@nestjs/common';
import { ProjectPort } from '../../../../application/domain/project/spi/project.spi';
import { Project } from '../../../../application/domain/project/project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectMapper } from './project.mapper';
import { LikeTypeormEntity } from '../../like/persistence/like.entity';
import { PublishedProjectResponse } from '../../../../application/domain/project/dto/project.dto';

@Injectable()
export class ProjectPersistenceAdapter implements ProjectPort {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly projectRepository: Repository<ProjectTypeormEntity>,
        private readonly projectMapper: ProjectMapper,
        @InjectRepository(LikeTypeormEntity)
        private readonly likeTypeormEntity: Repository<LikeTypeormEntity>
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

    async queryProjectsByPublished(published: boolean, userId: string): Promise<PublishedProjectResponse[]> {
        const isLiked = this.likeTypeormEntity.createQueryBuilder('lk')
            .select('COUNT(*)')
            .where('lk.user_id = :userId', { userId });

        const projects = await this.projectRepository.createQueryBuilder('p')
            .leftJoin('tbl_like', 'lk', 'p.project_id = lk.project_id')
            .leftJoin('p.user', 'user')
            .select('p.id', 'id')
            .addSelect('p.name', 'name')
            .addSelect('p.createdAt', 'startDate')
            .addSelect('p.finishDate', 'finishDate')
            .addSelect('user.profileUrl', 'userProfileUrl')
            .addSelect('user.githubAccountId', 'userAccountId')
            .addSelect('COUNT(lk.project_id)', 'likeCount')
            .addSelect('(' + isLiked.getQuery() + ') > 0', 'isLiked')
            .setParameters(isLiked.getParameters())
            .where('p.isPublished= :published', { published })
            .groupBy('p.project_id')
            .getRawMany();

        return projects.map((project): PublishedProjectResponse => {
            return {
                id: project.id,
                name: project.name,
                startDate: project.startDate,
                finishDate: project.finishDate,
                userAccountId: project.userAccountId,
                userProfileUrl: project.userProfileUrl,
                likeCount: project.likeCount,
                isLiked: project.isLiked == '1'
            };
        });
    }
}