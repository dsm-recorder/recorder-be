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

        return this.projectMapper.toDomain(await this.projectRepository.save(entity));
    }

    async queryProjectsByUserId(userId: string): Promise<Project[]> {
        const projects = await this.projectRepository.find({
            where: {
                userId: userId
            }
        });

        return Promise.all(
            projects.map(async (project) => await this.projectMapper.toDomain(project))
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

    async queryProjectByRepositoryNameAndUserId(
        repositoryName: string,
        userId: string
    ): Promise<Project> {
        return await this.projectMapper.toDomain(
            await this.projectRepository.findOne({
                where: {
                    githubOwnerRepository: repositoryName,
                    user: {
                        id: userId
                    }
                },
                relations: {
                    user: true
                }
            })
        );
    }

    async queryPublishedProjectsByName(
        userId: string,
        name: string
    ): Promise<PublishedProjectResponse[]> {
        const orderByClause = 'p.finishDate';

        const query = this.getQueryPublishedProjectQuery(orderByClause, userId);
        if (name) {
            query.where('p.name like :name', { name: `%${name}%` });
        }

        return (await query.getRawMany()).map((project) => {
            project.isLiked = project.isLiked == '1';
            return project;
        });
    }

    async queryPublishedProjectsOrderByLikeCountAndLimit(
        limit: number
    ): Promise<PublishedProjectResponse[]> {
        const orderByClause = 'p.likeCount';

        return (
            await this.getQueryPublishedProjectQuery(orderByClause).limit(limit).getRawMany()
        ).map((project) => {
            project.isLiked = project.isLiked == '1';

            return project;
        });
    }

    async queryUserLikedProjects(userId: string): Promise<PublishedProjectResponse[]> {
        const orderByClause = 'p.finishDate';
        const likeOnClause = 'p.project_id = lk.project_id and lk.user_id = :userId';

        return (
            await this.getQueryPublishedProjectQuery(orderByClause, userId)
                .setParameters({ userId })
                .innerJoin('tbl_like', 'lk', likeOnClause)
                .getRawMany()
        ).map((project) => {
            project.isLiked = project.isLiked == '1';

            return project;
        });
    }

    private getQueryPublishedProjectQuery(orderByClause: string, userId?: string) {
        const isLiked = this.likeTypeormEntity
            .createQueryBuilder('lk')
            .select('COUNT(*)')
            .where('lk.user_id = :userId and lk.project_id = id', { userId });

        return this.projectRepository
            .createQueryBuilder('p')
            .leftJoin('p.user', 'user')
            .select('p.id', 'id')
            .addSelect('p.name', 'name')
            .addSelect('p.createdAt', 'startDate')
            .addSelect('p.finishDate', 'finishDate')
            .addSelect('user.profileUrl', 'userProfileUrl')
            .addSelect('user.githubAccountId', 'userAccountId')
            .addSelect('p.logoUrl', 'logoImageUrl')
            .addSelect('p.likeCount', 'likeCount')
            .addSelect('(' + isLiked.getQuery() + ') > 0', 'isLiked')
            .setParameters(isLiked.getParameters())
            .where('p.isPublished= :published', { published: true })
            .groupBy('p.project_id')
            .orderBy(orderByClause, 'DESC');
    }

    async existsProjectById(projectId: string): Promise<boolean> {
        return await this.projectRepository.exist({
            where: { id: projectId }
        });
    }
}
