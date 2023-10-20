import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { GithubPort } from '../../github/spi/github.spi';
import { User } from '../../user/user';
import { CreateProjectRequest } from '../../../infrastructure/project/presentation/dto/project.web.dto';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(ProjectPort)
    private readonly projectPort: ProjectPort,
    @Inject(GithubPort)
    private readonly githubPort: GithubPort
  ) {}

  async execute(request: CreateProjectRequest, user: User) {
    const repository = await this.githubPort.getRepositoryDetails(request.repositoryName);
    const projectName = request.repositoryName.substring(request.repositoryName.indexOf('/') + 1);

    await this.projectPort.saveProject({
      userId: user.id,
      name: projectName,
      skills: request.skills.join(),
      isPublic: !repository.private
    });
  }
}
