import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from '../../domain/project/persistence/project.entity';
import { ProjectPersistenceAdapter } from '../../domain/project/persistence/project.persistence.adapter';
import { ProjectPort } from '../../../application/domain/project/spi/project.spi';
import { ProjectMapper } from '../../domain/project/persistence/project.mapper';
import { ProjectWebAdapter } from '../../domain/project/presentation/project.web.adapter';
import { QueryCurrentRepositoryUseCase } from '../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../application/domain/project/usecase/create-project.usecase';
import { QueryCurrentOrganizationsUseCase } from '../../../application/domain/project/usecase/query-current-organizations.usecase';
import { QueryOrganizationRepositoriesUseCase } from '../../../application/domain/project/usecase/query-organization-repositories.usecase';
import { QueryMyProjectsUseCase } from '../../../application/domain/project/usecase/query-my-projects.usecase';
import { PublishProjectUseCase } from '../../../application/domain/project/usecase/publish-project.usecase';
import { UpdateProjectUseCase } from '../../../application/domain/project/usecase/update-project.usecase';
import { QueryPublishedProjectsUseCase } from '../../../application/domain/project/usecase/query-published-projects.usecase';
import { QueryProjectIdUseCase } from '../../../application/domain/project/usecase/query-project-id.usecase';
import { QueryProjectDetailsUseCase } from '../../../application/domain/project/usecase/query-project-details.usecase';

const PROJECT_PORT = { provide: ProjectPort, useClass: ProjectPersistenceAdapter };
const PROJECT_REPOSITORY = TypeOrmModule.forFeature([ProjectTypeormEntity]);

@Global()
@Module({
    imports: [PROJECT_REPOSITORY],
    providers: [
        PROJECT_PORT,
        ProjectMapper,
        QueryCurrentRepositoryUseCase,
        CreateProjectUseCase,
        QueryCurrentOrganizationsUseCase,
        QueryOrganizationRepositoriesUseCase,
        QueryMyProjectsUseCase,
        PublishProjectUseCase,
        UpdateProjectUseCase,
        QueryPublishedProjectsUseCase,
        QueryProjectIdUseCase,
        QueryProjectDetailsUseCase,
    ],
    exports: [PROJECT_PORT, PROJECT_REPOSITORY],
    controllers: [ProjectWebAdapter],
})
export class ProjectModule {}
