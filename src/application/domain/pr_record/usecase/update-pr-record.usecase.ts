import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { UpdatePrRecordRequest } from '../../../../infrastructure/domain/pr_record/presentation/pr-record.web.dto';
import { RecordAttachment } from '../record-attachment';

@Injectable()
export class UpdatePrRecordUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort
    ) {}

    async execute(request: UpdatePrRecordRequest, prRecordId: string): Promise<void> {
        const prRecord = await this.prRecordPort.queryPrRecordById(prRecordId);
        if (!prRecord) {
            throw new NotFoundException('PrRecord Not Found');
        }
        const attachments = await this.prRecordPort.queryAttachmentsByPrRecordId(prRecordId);

        prRecord.update(
            request.title,
            request.content,
            request.importance,
            request.type,
            request.solution
        );
        await this.prRecordPort.deleteAllAttachments(attachments);
        await this.prRecordPort.saveAllAttachments(
            request.attachmentUrls.map(
                (attachmentUrl) => new RecordAttachment(attachmentUrl, prRecord.id)
            )
        );
        await this.prRecordPort.savePrRecord(prRecord);
    }
}
