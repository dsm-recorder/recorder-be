import { Injectable } from '@nestjs/common';
import { CommentPort } from '../../../../application/domain/comment/spi/comment.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentTypeormEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class CommentPersistenceAdapter implements CommentPort {
    constructor(
        @InjectRepository(CommentTypeormEntity)
        private readonly commentRepository: Repository<CommentTypeormEntity>
    ) {}

    async queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]> {
        const isMineQuery = this.commentRepository.createQueryBuilder('comment')
            .select('COUNT(*)')
            .where(`comment.user_id = '${userId}' and comment.project_id = '${projectId}'`)
            .getQuery();

        const comments = await this.commentRepository.createQueryBuilder('c')
            .innerJoin('tbl_user', 'u', 'u.user_id = c.user_id')
            .select([
                'c.id as id',
                'c.content as content',
                'c.createdAt as createdAt',
                'u.profileUrl as userLogoImageUrl',
                'u.githubAccountId as userAccountId',
                '(' + isMineQuery + ') > 0 as isMine'
            ])
            .getRawMany();

        return comments.map((comment) => {
            comment.createdAt = LocalDate.from(nativeJs(comment.createdAt));
            comment.isMine = comment.isMine === '1';

            return comment;
        });
    }


}