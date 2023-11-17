import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeTypeormEntity } from './like.entity';
import { LikePort } from '../../../../application/domain/like/spi/like.spi';
import { Like } from '../../../../application/domain/like/like';
import { LikeMapper } from './like.mapper';

@Injectable()
export class LikePersistenceAdapter implements LikePort {
    constructor(
        @InjectRepository(LikeTypeormEntity)
        private readonly likeRepository: Repository<LikeTypeormEntity>,
        private readonly likeMapper: LikeMapper
    ) {}

    async saveLike(like: Like): Promise<Like> {
        return this.likeMapper.toDomain(
            await this.likeRepository.save(await this.likeMapper.toEntity(like))
        );
    }

    async deleteLikeByUserIdAndProjectId(userId:string, projectId:string): Promise<void> {
        await this.likeRepository.createQueryBuilder('lk')
            .delete()
            .where('lk.user_id = :userId and lk.project_id = :projectId', { userId, projectId})
            .execute();
    }

    async queryLikeByUserIdAndProjectId(userId: string, projectId: string): Promise<Like> {
        return this.likeMapper.toDomain(
            await this.likeRepository
                .createQueryBuilder()
                .where('user_id = :userId && project_id = :projectId', {
                    userId: userId,
                    projectId: projectId
                })
                .getOne()
        );
    }

    async existsLikeByProjectIdAndUserId(projectId: string, userId: string): Promise<boolean> {
        return await this.likeRepository.createQueryBuilder('lk')
            .where('lk.project_id = :projectId')
            .where('lk.user_id = :userId')
            .setParameters({ projectId, userId })
            .getOne() !== null;
    }
}
