import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from '../../project/presistence/project.entity';
import { ProjectPersistenceAdapter } from '../../project/presistence/project.persistence.adapter';
import { ProjectPort } from '../../../application/project/spi/project.spi';
import { ProjectMapper } from '../../project/presistence/project.mapper';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { ProjectWebAdapter } from '../../project/presentation/project.web.adapter';
import { QueryCurrentRepositoryUseCase } from '../../../application/project/usecase/query-current-repository.usecase';
import { GithubModule } from './github.module';
import { CreateProjectUseCase } from '../../../application/project/usecase/create-project.usecase';
import { UserModule } from './user.module';

const PROJECT_PORT = { provide: ProjectPort, useClass: ProjectPersistenceAdapter };
const PROJECT_REPOSITORY = TypeOrmModule.forFeature([ProjectTypeormEntity]);

@Module({
  imports: [PROJECT_REPOSITORY, GithubModule, UserModule],
  providers: [PROJECT_PORT, ProjectMapper, QueryCurrentRepositoryUseCase, CreateProjectUseCase],
  exports: [PROJECT_PORT, PROJECT_REPOSITORY],
  controllers: [ProjectWebAdapter]
})
export class ProjectModule {}