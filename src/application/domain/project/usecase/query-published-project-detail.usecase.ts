import { QueryPublishedProjectDetailResponse } from '../dto/project.dto';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { LikePort } from '../../like/spi/like.spi';

@Injectable()
export class QueryPublishedProjectDetailUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
        @Inject(LikePort)
        private readonly likePort: LikePort
    ) {}


    async execute(projectId: string, userId?: string): Promise<QueryPublishedProjectDetailResponse> {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (!project.isPublished) {
            throw new ForbiddenException('Project Not Published');
        }

        let isLiked = false;
        if (userId != null) {
            await this.likePort.existsLikeByProjectIdAndUserId(projectId, userId);
        }

        return {
            name: project.name,
            logoImageUrl: project.logoUrl,
            startDate: project.createdAt,
            finishDate: project.finishDate,
            likeCount: project.likeCount,
            skills: project.skills,
            about: project.description,
            role: project.role,
            learned: project.learned,
            isLiked
        }
    }
}