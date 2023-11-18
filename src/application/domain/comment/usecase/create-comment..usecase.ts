import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { CreateCommentRequest } from '../../../../infrastructure/domain/comment/presentation/comment.web.dto';
import { ProjectPort } from '../../project/spi/project.spi';
import { Comment } from '../comment';

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string, request: CreateCommentRequest, userId: string) {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (!project.isPublished) {
            throw new ForbiddenException('Project Not Published');
        }

        await this.commentPort.saveComment(new Comment(request.content, userId, project.id));
    }
}
