import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { UpdateProjectRequest } from '../dto/project.dto';

@Injectable()
export class UpdateProjectUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
    ) {}

    async execute(projectId: string, request: UpdateProjectRequest): Promise<void> {
        const project = await this.projectPort.queryProjectById(projectId);

        project.update(
            request.name,
            request.skills,
            request.isPublic,
            request.logoUrl,
            request.description,
        );
        await this.projectPort.saveProject(project);
    }
}
