import { Project } from '../../../../application/domain/project/project';
import { ProjectTypeormEntity } from './project.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { convert, LocalDate, LocalTime, nativeJs } from 'js-joda';

@Injectable()
export class ProjectMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
    ) {}

    async toDomain(entity: ProjectTypeormEntity): Promise<Project> {
        return entity
            ? new Project(
                  (await entity.user).id,
                  entity.name,
                  entity.skills,
                  entity.isPublic,
                  entity.logoUrl,
                  entity.githubOwnerRepository,
                  entity.description,
                  LocalDate.from(nativeJs(entity.createdAt)),
                  entity.id,
              )
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
            convert(domain.createdAt).toDate(),
        );
    }
}
