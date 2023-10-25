import { Inject, Injectable } from '@nestjs/common';
import { ProjectGithubAxiosPort, ProjectPort } from '../spi/project.spi';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { User } from '../../user/user';
import { CreateProjectRequest } from '../../../../infrastructure/domain/project/presentation/dto/project.web.dto';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(ProjectPort)
    private readonly projectPort: ProjectPort,
    @Inject(AxiosPort)
    private readonly githubPort: ProjectGithubAxiosPort
  ) {}

  async execute(request: CreateProjectRequest, user: User) {
    const repository = await this.githubPort.getRepositoryDetails(request.repositoryName);

    await this.projectPort.saveProject({
      userId: user.id,
      name: repository.name,
      skills: request.skills.join(),
      isPublic: request.isPublic
    });
  }
}
