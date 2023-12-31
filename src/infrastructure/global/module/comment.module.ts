import { Global, Module } from '@nestjs/common';
import { CommentWebAdapter } from '../../domain/comment/presentation/comment.web.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTypeormEntity } from '../../domain/comment/persistence/comment.entity';
import { CommentPort } from '../../../application/domain/comment/spi/comment.spi';
import { CommentPersistenceAdapter } from '../../domain/comment/persistence/comment.persistence.adapter';
import {
    QueryProjectCommentsUseCase
} from '../../../application/domain/comment/usecase/query-project-comments.usecase';
import { RemoveCommentUseCase } from '../../../application/domain/comment/usecase/remove-comment.usecase';
import { CommentMapper } from '../../domain/comment/persistence/comment.mapper';
import { CreateCommentUseCase } from '../../../application/domain/comment/usecase/create-comment..usecase';

const COMMENT_REPOSITORY = TypeOrmModule.forFeature([CommentTypeormEntity]);
const COMMENT_PORT = { provide: CommentPort, useClass: CommentPersistenceAdapter };

@Global()
@Module({
    imports: [COMMENT_REPOSITORY],
    providers: [
        COMMENT_PORT,
        CommentMapper,
        QueryProjectCommentsUseCase,
        RemoveCommentUseCase,
        CreateCommentUseCase
    ],
    exports: [COMMENT_REPOSITORY, COMMENT_PORT],
    controllers: [CommentWebAdapter]
})
export class CommentModule {}
