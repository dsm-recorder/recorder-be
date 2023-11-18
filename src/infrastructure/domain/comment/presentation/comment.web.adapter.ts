import { Controller, Delete, Get, HttpCode, Param } from '@nestjs/common';
import { QueryProjectCommentsResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import {
    QueryProjectCommentsUseCase
} from '../../../../application/domain/comment/usecase/query-project-comments.usecase';
import { RemoveCommentUseCase } from '../../../../application/domain/comment/usecase/remove-comment.usecase';

@Controller('comments')
export class CommentWebAdapter {
    constructor(
        private readonly queryProjectCommentsUseCase: QueryProjectCommentsUseCase,
        private readonly removeCommentUseCase: RemoveCommentUseCase
    ) {}

    @Permission([Authority.USER])
    @Get('/:projectId')
    async queryProjectComments(
        @Param('projectId') projectId: string,
        @CurrentUser() user: User
    ): Promise<QueryProjectCommentsResponse> {
        return await this.queryProjectCommentsUseCase.execute(projectId, user.id);
    }

    @HttpCode(204)
    @Permission([Authority.USER])
    @Delete(':commentId')
    async removeComment(
        @Param('commentId') commentId: string,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.removeCommentUseCase.execute(commentId, user.id);
    }

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post('/:projectId')
    async createComment(
        @Param('projectId') projectId: string,
        @Body() request: CreateCommentRequest,
        @CurrentUser() user: User
    ) {
        return await this.createCommentUseCase.execute(projectId, request, user.id);
    }
}
