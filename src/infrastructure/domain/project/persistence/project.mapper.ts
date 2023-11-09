import { Project } from '../../../../application/domain/project/project';
import { ProjectTypeormEntity } from './project.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { convert } from 'js-joda';

@Injectable()
export class ProjectMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: ProjectTypeormEntity): Promise<Project> {
        return entity
            ? {
                id: entity.id,
                userId: (await entity.user).id,
                skills: entity.skills,
                name: entity.name,
                logoUrl: entity.logoUrl,
                isPublic: entity.isPublic,
                description: entity.description,
                githubOwnerRepository: entity.githubOwnerRepository
            }
            : null;
    }

    async toEntity(domain: Project): Promise<ProjectTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        return new ProjectTypeormEntity(
            domain.id,
            Promise.resolve(user),
            domain.name,
            domain.skills,
            domain.isPublic,
            domain.logoUrl,
            domain.description,
            domain.githubOwnerRepository,
            convert(domain.createdAt).toDate()
        );
    }
}