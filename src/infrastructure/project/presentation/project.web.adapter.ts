import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { QueryCurrentRepositoryUseCase } from '../../../application/project/usecase/query-current-repository.usecase';
import { CreateProjectUseCase } from '../../../application/project/usecase/create-project.usecase';
import { CreateProjectRequest } from './dto/project.web.dto';
import { CurrentUser } from '../../global/decorator/current-user.decorator';
import { User } from '../../../application/user/user';
import { Permission } from '../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';

@Controller('projects')
export class ProjectWebAdapter {
  constructor(
    private readonly queryCurrentRepositoryUseCase: QueryCurrentRepositoryUseCase,
    private readonly createProjectUseCase: CreateProjectUseCase
  ) {}

  @Get('/repository')
  async queryCurrentRepository(@Query('name') name: string) {
    return this.queryCurrentRepositoryUseCase.execute(name);
  }

  @Post()
  @Permission([Authority.USER])
  @HttpCode(201)
  async createProject(@Body() request: CreateProjectRequest, @CurrentUser() user: User) {
    return this.createProjectUseCase.execute(request, user);
  }
}
