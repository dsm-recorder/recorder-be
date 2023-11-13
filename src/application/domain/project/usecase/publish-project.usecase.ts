import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../user/user';
import { ProjectPort } from '../spi/project.spi';
import { PublishProjectRequest } from '../../../../infrastructure/domain/project/presentation/dto/project.web.dto';
import { PrRecordPort } from '../../pr_record/spi/pr-record.spi';

@Injectable()
export class PublishProjectUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort
    ) {}

    async execute(request: PublishProjectRequest, projectId: string, user: User) {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (project.userId !== user.id) {
            throw new ForbiddenException('Invalid User');
        }

        if (project.isPublished) {
            throw new ConflictException('Project Already Published');
        }

        project.publish(
            request.role,
            request.learned
        );

        await this.projectPort.saveProject(project);

        const prRecords = await this.prRecordPort.queryPrRecordsByIdIn(request.prRecordIds);
        if (prRecords.length !== request.prRecordIds.length) {
            throw new NotFoundException('Pr Record Not Found');
        }
        prRecords.map((prRecord) => prRecord.publish());

        await this.prRecordPort.saveAllPrRecords(prRecords);
    }

}