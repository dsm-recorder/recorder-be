import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { User } from '../../user/user';
import { CreateProjectRequest } from '../../../../infrastructure/domain/project/presentation/dto/project.web.dto';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(ProjectPort)
    private readonly projectPort: ProjectPort
  ) {
  }

  async execute(request: CreateProjectRequest, user: User) {
    await this.projectPort.saveProject({
      userId: user.id,
      name: request.projectName,
      skills: request.skills.join(),
      githubOwnerRepository: request.repositoryName,
      isPublic: request.isPublic
    });
  }
}
