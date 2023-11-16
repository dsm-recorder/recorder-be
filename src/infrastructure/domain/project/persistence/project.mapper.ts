import { Project } from '../../../../application/domain/project/project';
import { ProjectTypeormEntity } from './project.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { convert, LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class ProjectMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: ProjectTypeormEntity): Promise<Project> {
        return entity
            ? new Project(
                entity.user.id,
                entity.name,
                entity.skills,
                entity.logoUrl,
                entity.githubOwnerRepository,
                entity.description,
                entity.isPublished,
                entity.likeCount,
                entity.createdAt ? LocalDate.from(nativeJs(entity.createdAt)): null,
                entity.finishDate ? LocalDate.from(nativeJs(entity.finishDate)) : null,
                entity.role,
                entity.learned,
                entity.id
            )
            : null;
    }

    async toEntity(domain: Project): Promise<ProjectTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        return new ProjectTypeormEntity(
            user,
            domain.name,
            domain.skills,
            domain.logoUrl,
            domain.description,
            domain.githubOwnerRepository,
            domain.isPublished,
            domain.likeCount,
            domain.finishDate ? convert(domain.finishDate).toDate() : null,
            domain.role,
            domain.learned,
            domain.id
        );
    }
}
