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
        private readonly likeMapper: LikeMapper,
    ) {}

    async saveLike(like: Like): Promise<Like> {
        return this.likeMapper.toDomain(
            await this.likeRepository.save(await this.likeMapper.toEntity(like)),
        );
    }

    async deleteLike(like: Like): Promise<void> {
        await this.likeRepository.remove(await this.likeMapper.toEntity(like));
    }

    async queryLikeByUserIdAndProjectId(userId: string, projectId: string): Promise<Like> {
        return this.likeMapper.toDomain(
            await this.likeRepository
                .createQueryBuilder()
                .where('user_id = :userId && project_id = :projectId', {
                    userId: userId,
                    projectId: projectId,
                })
                .getOne(),
        );
    }
}
