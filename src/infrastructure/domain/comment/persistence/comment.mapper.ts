import { Injectable } from '@nestjs/common';
import { CommentTypeormEntity } from './comment.entity';
import { Comment } from '../../../../application/domain/comment/comment';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { Repository } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Injectable()
export class CommentMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        @InjectRepository(ProjectTypeormEntity)
        private readonly projectRepository: Repository<ProjectTypeormEntity>
    ) {}

    toDomain(entity: CommentTypeormEntity): Comment {
        return new Comment(
            entity.content,
            entity.user.id,
            entity.project.id,
            entity.id
        );
    }

    async toEntity(domain: Comment): Promise<CommentTypeormEntity> {
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        const project = await this.projectRepository.findOneBy({ id: domain.projectId });

        return new CommentTypeormEntity(
            domain.content,
            user,
            project,
            domain.id
        );
    }
}