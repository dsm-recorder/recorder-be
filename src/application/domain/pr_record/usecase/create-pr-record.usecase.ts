import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PRRecordPort } from '../spi/pr-record.spi';
import { CreatePRRecordRequest } from '../dto/pr-record.dto';
import { ProjectPort } from '../../project/spi/project.spi';
import { User } from '../../user/user';

@Injectable()
export class CreatePRRecordUseCase {
    constructor(
        @Inject(PRRecordPort)
        private readonly prRecordPort: PRRecordPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
    ) {}

    async execute(request: CreatePRRecordRequest, user: User) {
        const project = await this.projectPort.queryProjectById(request.projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (project.userId !== user.id) {
            throw new UnauthorizedException('Invalid User');
        }

        await this.prRecordPort.savePRRecord({
            projectId: project.id,
            title: request.title,
            content: request.content,
            solution: request.solution,
            type: request.type,
        });
    }
}
