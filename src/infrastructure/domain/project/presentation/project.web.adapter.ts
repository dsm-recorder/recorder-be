import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import {
    QueryCurrentRepositoryUseCase,
} from '../../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../../application/domain/project/usecase/create-project.usecase';
import { CreateProjectRequest } from './dto/project.web.dto';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import {
    QueryCurrentOrganizationsUseCase,
} from '../../../../application/domain/project/usecase/query-current-organizations.usecase';
import {
    QueryOrganizationRepositoriesUseCase,
} from '../../../../application/domain/project/usecase/query-organization-repositories.usecase';
import {
    QueryCurrentOrganizationsResponse,
    QueryMyProjectsResponse,
    QueryRepositoriesResponse,
} from '../../../../application/domain/project/dto/project.dto';
import { QueryMyProjectsUseCase } from '../../../../application/domain/project/usecase/query-my-projects.usecase';

@Controller('projects')
export class ProjectWebAdapter {
    constructor(
        private readonly queryCurrentRepositoryUseCase: QueryCurrentRepositoryUseCase,
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly queryCurrentOrganizationsUseCase: QueryCurrentOrganizationsUseCase,
        private readonly queryOrganizationRepositoriesUseCase: QueryOrganizationRepositoriesUseCase,
        private readonly queryMyProjectsUseCase: QueryMyProjectsUseCase,
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
    async queryCurrentOrganizations(@CurrentUser() user: User): Promise<QueryCurrentOrganizationsResponse> {
        return await this.queryCurrentOrganizationsUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @Get('/organization/repository')
    async queryOrganizationRepositories(@Query('organization') organization: string): Promise<QueryRepositoriesResponse> {
        return await this.queryOrganizationRepositoriesUseCase.execute(organization);
    }

    @Permission([Authority.USER])
    @Get('/my')
    async queryMyProjects(@CurrentUser() user: User): Promise<QueryMyProjectsResponse> {
        return await this.queryMyProjectsUseCase.execute(user);
    }
}
