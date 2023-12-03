import { Injectable } from '@nestjs/common';
import { CommentPort } from '../../../../application/domain/comment/spi/comment.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentTypeormEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { LocalDate, nativeJs } from 'js-joda';
import { Comment } from '../../../../application/domain/comment/comment';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class CommentPersistenceAdapter implements CommentPort {
    constructor(
        @InjectRepository(CommentTypeormEntity)
        private readonly commentRepository: Repository<CommentTypeormEntity>,
        private readonly commentMapper: CommentMapper
    ) {}

    async queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]> {
        console.log(projectId);
        const isMineQuery = this.commentRepository
            .createQueryBuilder('comment')
            .select('COUNT(*)')
            .where(`comment.user_id = '${userId}' and comment.project_id = '${projectId}'`)
            .getQuery();

        const comments = await this.commentRepository
            .createQueryBuilder('c')
            .innerJoin('tbl_user', 'u', 'u.user_id = c.user_id')
            .select([
                'c.id as id',
                'c.content as content',
                'c.createdAt as createdAt',
                'u.profileUrl as userLogoImageUrl',
                'u.githubAccountId as userAccountId',
                '(' + isMineQuery + ') > 0 as isMine'
            ])
            .where(`c.project_id = '${projectId}'`)
            .getRawMany();

        return comments.map((comment) => {
            comment.createdAt = LocalDate.from(nativeJs(comment.createdAt));
            comment.isMine = comment.isMine === '1';

            return comment;
        });
    }

    async queryCommentById(commentId: string): Promise<Comment> {
        return this.commentMapper.toDomain(await this.commentRepository.findOne({
            where: {
                id: commentId
            },
            relations: {
                user: true,
                project: true
            },
            order: {
                createdAt: 'desc'
            }
        }));
    }

    async saveComment(comment: Comment): Promise<Comment> {
        return this.commentMapper.toDomain(
            await this.commentRepository.save(await this.commentMapper.toEntity(comment))
        );
    }

    async removeComment(comment: Comment): Promise<void> {
        await this.commentRepository.remove(
            await this.commentMapper.toEntity(comment)
        );
    }

}