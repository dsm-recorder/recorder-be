import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../../../../application/domain/project/spi/project.spi';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import { LikeTypeormEntity } from './like.entity';
import { Like } from '../../../../application/domain/like/like';
import { Repository } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Injectable()
export class LikeMapper {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly projectRepository: Repository<ProjectTypeormEntity>,
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: LikeTypeormEntity): Promise<Like> {
        return entity ? new Like(entity.projectId, entity.userId) : null;
    }

    async toEntity(domain: Like): Promise<LikeTypeormEntity> {
        const project = await this.projectRepository.findOneBy({ id: domain.projectId });
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        return new LikeTypeormEntity(project, user);
    }
}
