import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PRRecordPort } from '../spi/pr-record.spi';
import { CreatePRRecordRequest } from '../dto/pr-record.dto';
import { ProjectPort } from '../../project/spi/project.spi';
import { User } from '../../user/user';
import { LocalDate } from 'js-joda';

@Injectable()
export class CreatePRRecordUseCase {
    constructor(
        @Inject(PRRecordPort)
        private readonly prRecordPort: PRRecordPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
    ) {}

    async execute(projectId: string, request: CreatePRRecordRequest, user: User) {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (project.userId !== user.id) {
            throw new UnauthorizedException('Invalid User');
        }

        await this.prRecordPort.savePRRecord({
            title: request.title,
            projectId: projectId,
            content: request.content,
            importance: request.importance,
            type: request.type,
            date: LocalDate.now(),
            solution: request.solution
        });
    }
}
