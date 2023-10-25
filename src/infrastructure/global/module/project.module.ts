import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from '../../domain/project/presistence/project.entity';
import { ProjectPersistenceAdapter } from '../../domain/project/presistence/project.persistence.adapter';
import { ProjectPort } from '../../../application/domain/project/spi/project.spi';
import { ProjectMapper } from '../../domain/project/presistence/project.mapper';
import { ProjectWebAdapter } from '../../domain/project/presentation/project.web.adapter';
import {
    QueryCurrentRepositoryUseCase,
} from '../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../application/domain/project/usecase/create-project.usecase';
import { UserModule } from './user.module';

const PROJECT_PORT = { provide: ProjectPort, useClass: ProjectPersistenceAdapter };
const PROJECT_REPOSITORY = TypeOrmModule.forFeature([ProjectTypeormEntity]);

@Module({
    imports: [PROJECT_REPOSITORY, UserModule],
    providers: [PROJECT_PORT, ProjectMapper, QueryCurrentRepositoryUseCase, CreateProjectUseCase],
    exports: [PROJECT_PORT, PROJECT_REPOSITORY],
    controllers: [ProjectWebAdapter],
})
export class ProjectModule {
}
