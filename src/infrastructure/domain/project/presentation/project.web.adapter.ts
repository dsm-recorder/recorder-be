import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
    QueryCurrentRepositoryUseCase,
} from '../../../../application/domain/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../../application/domain/project/usecase/create-project.usecase';
import { CreateProjectRequest } from './dto/project.web.dto';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';

@Controller('projects')
export class ProjectWebAdapter {
    constructor(
        private readonly queryCurrentRepositoryUseCase: QueryCurrentRepositoryUseCase,
        private readonly createProjectUseCase: CreateProjectUseCase,
    ) {}

    @Permission([Authority.USER])
    @Get('/repository')
    async queryCurrentRepository(@CurrentUser() user: User) {
        return await this.queryCurrentRepositoryUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post()
    async createProject(@Body() request: CreateProjectRequest, @CurrentUser() user: User) {
        return await this.createProjectUseCase.execute(request, user);
    }
}
