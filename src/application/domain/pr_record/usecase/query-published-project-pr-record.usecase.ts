import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { ProjectPort } from '../../project/spi/project.spi';
import { QueryPublishedPrRecordsResponse } from '../dto/pr-record.dto';

@Injectable()
export class QueryPublishedProjectPrRecordUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string): Promise<QueryPublishedPrRecordsResponse> {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        const prRecords = await this.prRecordPort.queryPublishedPrRecordsByProjectId(projectId);

        return {
            prRecords
        };
    }
}