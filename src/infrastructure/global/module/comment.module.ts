import { Global, Module } from '@nestjs/common';
import { CommentWebAdapter } from '../../domain/comment/presentation/comment.web.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTypeormEntity } from '../../domain/comment/persistence/comment.entity';
import { CommentPort } from '../../../application/domain/comment/spi/comment.spi';
import { CommentPersistenceAdapter } from '../../domain/comment/persistence/comment.persistence.adapter';


const COMMENT_REPOSITORY = TypeOrmModule.forFeature([CommentTypeormEntity]);
const COMMENT_PORT = { provide: CommentPort, useClass: CommentPersistenceAdapter };

@Global()
@Module({
    imports: [COMMENT_REPOSITORY],
    providers: [COMMENT_PORT],
    exports: [COMMENT_REPOSITORY, COMMENT_PORT],
    controllers: [CommentWebAdapter]
})
export class CommentModule {}