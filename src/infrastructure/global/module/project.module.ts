import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from '../../domain/project/persistence/project.entity';
import { ProjectPersistenceAdapter } from '../../domain/project/persistence/project.persistence.adapter';
import { ProjectPort } from '../../../application/domain/project/spi/project.spi';
import { ProjectMapper } from '../../domain/project/persistence/project.mapper';
import { ProjectWebAdapter } from '../../domain/project/presentation/project.web.adapter';
import { QueryCurrentRepositoryUseCase } from '../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../application/domain/project/usecase/create-project.usecase';
import { UserModule } from './user.module';
import { QueryCurrentOrganizationsUseCase } from '../../../application/domain/project/usecase/query-current-organizations.usecase';
import { QueryOrganizationRepositoriesUseCase } from '../../../application/domain/project/usecase/query-organization-repositories.usecase';
import { QueryMyProjectsUseCase } from '../../../application/domain/project/usecase/query-my-projects.usecase';
import { UpdateProjectUseCase } from '../../../application/domain/project/usecase/update-project.usecase';

const PROJECT_PORT = { provide: ProjectPort, useClass: ProjectPersistenceAdapter };
const PROJECT_REPOSITORY = TypeOrmModule.forFeature([ProjectTypeormEntity]);

@Module({
    imports: [PROJECT_REPOSITORY, UserModule],
    providers: [
        PROJECT_PORT,
        ProjectMapper,
        QueryCurrentRepositoryUseCase,
        CreateProjectUseCase,
        QueryCurrentOrganizationsUseCase,
        QueryOrganizationRepositoriesUseCase,
        QueryMyProjectsUseCase,
        UpdateProjectUseCase,
    ],
    exports: [PROJECT_PORT, PROJECT_REPOSITORY],
    controllers: [ProjectWebAdapter],
})
export class ProjectModule {}
