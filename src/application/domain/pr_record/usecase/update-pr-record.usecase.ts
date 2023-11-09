import { Inject, Injectable } from '@nestjs/common';
import { PrRecordPort } from '../spi/pr-record.spi';
import { UpdatePrRecordRequest } from '../../../../infrastructure/domain/pr_record/presentation/pr-record.web.dto';

@Injectable()
export class UpdatePrRecordUseCase {
    constructor(
        @Inject(PrRecordPort)
        private readonly prRecordPort: PrRecordPort
    ) {}

    async execute(request: UpdatePrRecordRequest, prRecordId: string): Promise<void> {
        const prRecord = await this.prRecordPort.queryPrRecordById(prRecordId);
        prRecord.update(
            request.title,
            request.content,
            request.importance,
            request.type,
            request.solution
        );

        await this.prRecordPort.savePrRecord(prRecord);
    }
}