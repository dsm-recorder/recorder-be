import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { ProjectPort } from '../../project/spi/project.spi';
import { User } from '../../user/user';
import { PrRecord } from '../pr-record';
import { CreatePRRecordRequest } from '../../../../infrastructure/domain/pr_record/presentation/pr-record.web.dto';

@Injectable()
export class CreatePRRecordUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string, request: CreatePRRecordRequest, user: User) {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (project.userId !== user.id) {
            throw new UnauthorizedException('Invalid User');
        }

        await this.prRecordPort.savePrRecord(
            new PrRecord(
                request.title,
                project.id,
                request.content,
                request.importance,
                request.type,
                request.solution
            )
        );
    }
}
