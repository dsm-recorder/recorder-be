import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryCurrentRepositoryUseCase } from '../../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../../application/domain/project/usecase/create-project.usecase';
import { CreateProjectRequest, PublishProjectRequest } from './dto/project.web.dto';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { QueryCurrentOrganizationsUseCase } from '../../../../application/domain/project/usecase/query-current-organizations.usecase';
import { QueryOrganizationRepositoriesUseCase } from '../../../../application/domain/project/usecase/query-organization-repositories.usecase';
import {
    QueryCurrentOrganizationsResponse,
    QueryMyProjectsResponse,
    QueryProjectDetailsResponse,
    QueryProjectIdResponse,
    QueryPublishedProjectsResponse,
    QueryRepositoriesResponse,
    UpdateProjectRequest
} from '../../../../application/domain/project/dto/project.dto';
import { QueryMyProjectsUseCase } from '../../../../application/domain/project/usecase/query-my-projects.usecase';
import { UpdateProjectUseCase } from '../../../../application/domain/project/usecase/update-project.usecase';
import { PublishProjectUseCase } from '../../../../application/domain/project/usecase/publish-project.usecase';
import { QueryPublishedProjectsUseCase } from '../../../../application/domain/project/usecase/query-published-projects.usecase';
import { QueryProjectIdUseCase } from '../../../../application/domain/project/usecase/query-project-id.usecase';
import { QueryProjectDetailsUseCase } from '../../../../application/domain/project/usecase/query-project-details.usecase';

@Controller('projects')
export class ProjectWebAdapter {
    constructor(
        private readonly queryCurrentRepositoryUseCase: QueryCurrentRepositoryUseCase,
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly queryCurrentOrganizationsUseCase: QueryCurrentOrganizationsUseCase,
        private readonly queryOrganizationRepositoriesUseCase: QueryOrganizationRepositoriesUseCase,
        private readonly queryMyProjectsUseCase: QueryMyProjectsUseCase,
        private readonly publishProjectUseCase: PublishProjectUseCase,
        private readonly updateProjectUseCase: UpdateProjectUseCase,
        private readonly queryPublishedProjectsUseCase: QueryPublishedProjectsUseCase,
        private readonly queryProjectIdUseCase: QueryProjectIdUseCase,
        private readonly queryProjectDetailsUseCase: QueryProjectDetailsUseCase
    ) {}

    @Permission([Authority.USER])
    @Get('/repository')
    async queryCurrentRepository(@CurrentUser() user: User): Promise<QueryRepositoriesResponse> {
        return await this.queryCurrentRepositoryUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post()
    async createProject(@Body() request: CreateProjectRequest, @CurrentUser() user: User) {
        await this.createProjectUseCase.execute(request, user);
    }

    @Permission([Authority.USER])
    @Get('/organization')
    async queryCurrentOrganizations(
        @CurrentUser() user: User
    ): Promise<QueryCurrentOrganizationsResponse> {
        return await this.queryCurrentOrganizationsUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @Get('/organization/repository')
    async queryOrganizationRepositories(
        @Query('organization') organization: string
    ): Promise<QueryRepositoriesResponse> {
        return await this.queryOrganizationRepositoriesUseCase.execute(organization);
    }

    @Permission([Authority.USER])
    @Get('/id')
    async queryProjectId(
        @Query('repositoryName') repositoryName: string,
        @CurrentUser() user: User
    ): Promise<QueryProjectIdResponse> {
        return await this.queryProjectIdUseCase.execute(repositoryName, user.id);
    }

    @Permission([Authority.USER])
    @Get('/my')
    async queryMyProjects(@CurrentUser() user: User): Promise<QueryMyProjectsResponse> {
        return await this.queryMyProjectsUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @Patch('/:projectId/publish')
    async publishProject(
        @Body() request: PublishProjectRequest,
        @Param('projectId') projectId: string,
        @CurrentUser() user: User
    ) {
        await this.publishProjectUseCase.execute(request, projectId, user);
    }

    @Permission([Authority.USER])
    @Get('/published')
    async queryPublishedProjects(
        @CurrentUser() user: User
    ): Promise<QueryPublishedProjectsResponse> {
        return await this.queryPublishedProjectsUseCase.execute(user.id);
    }

    @Permission([Authority.USER])
    @HttpCode(204)
    @Patch('/:projectId')
    async updateProject(
        @Param('projectId') projectId: string,
        @Body() request: UpdateProjectRequest
    ) {
        await this.updateProjectUseCase.execute(projectId, request);
    }

    @Permission([Authority.USER])
    @Get('/:projectId')
    async queryProjectDetails(
        @Param('projectId') projectId: string,
        @CurrentUser() user: User
    ): Promise<QueryProjectDetailsResponse> {
        return await this.queryProjectDetailsUseCase.execute(projectId, user);
    }
          
    @Get('/monthly')
    async queryMonthlyProjects(@CurrentUser() user: User): Promise<QueryPublishedProjectsResponse> {
        return await this.queryPublishedProjectsUseCase.queryMonthlyProjects(user.id);
    }

    @Permission([Authority.USER])
    @Get('/liked')
    async queryLikedProjects(@CurrentUser() user: User): Promise<QueryPublishedProjectsResponse> {
        return await this.queryPublishedProjectsUseCase.queryLikedProjects(user.id);
    }
}
