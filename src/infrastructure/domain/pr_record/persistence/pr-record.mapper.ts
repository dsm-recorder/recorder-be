import { Injectable } from '@nestjs/common';
import { ProjectTypeormEntity } from '../../project/presistence/project.entity';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { PRRecord } from '../../../../application/domain/pr_record/pr-record';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PRRecordMapper {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly projectRepository: Repository<ProjectTypeormEntity>,
    ) {}
    async toDomain(entity: PRRecordTypeormEntity): Promise<PRRecord> {
        const project = await entity.project;
        return entity
            ? {
                  id: entity.id,
                  projectId: project.id,
                  title: entity.title,
                  content: entity.content,
                  solution: entity.solution,
                  type: entity.type,
              }
            : null;
    }

    async toEntity(domain: PRRecord): Promise<PRRecordTypeormEntity> {
        const project = await this.projectRepository.findOneBy({ id: domain.projectId });
        return new PRRecordTypeormEntity(
            domain.id,
            Promise.resolve(project),
            domain.title,
            domain.content,
            domain.solution,
            domain.type,
        );
    }
}
