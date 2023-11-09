import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { PrRecordResponse, QueryProjectPrRecordsResponse } from '../dto/pr-record.dto';
import { ProjectPort } from '../../project/spi/project.spi';

@Injectable()
export class QueryProjectPrRecordsUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string): Promise<QueryProjectPrRecordsResponse> {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }
        const prRecords = await this.prRecordPort.queryPrRecordsByProjectId(projectId);

        return {
            prRecords: prRecords.map((prRecord): PrRecordResponse => {
                return {
                    id: prRecord.id,
                    title: prRecord.title,
                    importance: prRecord.importance,
                    type: prRecord.type,
                    date: prRecord.date
                };
            })
        };
    }
}