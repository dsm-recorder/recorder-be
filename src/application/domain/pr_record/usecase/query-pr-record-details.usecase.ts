import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { QueryPrRecordDetailsResponse } from '../dto/pr-record.dto';

@Injectable()
export class QueryPrRecordDetailsUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort
    ) {}

    async execute(prRecordId: string): Promise<QueryPrRecordDetailsResponse> {
        const prRecord = await this.prRecordPort.queryPrRecordById(prRecordId);
        if (!prRecord) {
            throw new NotFoundException('PrRecord Not Found');
        }
        const attachments = await this.prRecordPort.queryAttachmentsByPrRecordId(prRecordId);

        return {
            title: prRecord.title,
            type: prRecord.type,
            content: prRecord.content,
            solution: prRecord.solution,
            attachmentUrls: attachments.map((attachment) => attachment.attachmentUrl)
        };
    }
}
