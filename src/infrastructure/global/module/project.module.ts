import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from '../../project/presistence/project.entity';
import { ProjectPersistenceAdapter } from '../../project/presistence/project.persistence.adapter';
import { ProjectPort } from '../../../application/project/spi/project.spi';
import { ProjectMapper } from '../../project/presistence/project.mapper';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

const PROJECT_PORT = { provide: ProjectPort, useClass: ProjectPersistenceAdapter };

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTypeormEntity, UserTypeormEntity])],
  providers: [PROJECT_PORT, ProjectMapper],
  exports: [PROJECT_PORT]
})
export class ProjectModule {}
