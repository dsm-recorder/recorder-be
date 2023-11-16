import { TypeOrmModule } from '@nestjs/typeorm';
import { PRRecordTypeormEntity } from '../../domain/pr_record/persistence/pr-record.entity';
import { RecordAttachmentTypeormEntity } from '../../domain/pr_record/persistence/record-attachment.entity';
import { PrRecordPort } from '../../../application/domain/pr_record/spi/pr-record.spi';
import { PrRecordPersistenceAdapter } from '../../domain/pr_record/persistence/pr-record.persistence.adapter';
import { Global, Module } from '@nestjs/common';
import { ProjectModule } from './project.module';
import { PrRecordMapper } from '../../domain/pr_record/persistence/pr-record.mapper';
import { QueryProjectPrRecordsUseCase } from '../../../application/domain/pr_record/usecase/query-project-pr-records.usecase';
import { PrRecordWebAdapter } from '../../domain/pr_record/presentation/pr-record.web.adapter';
import { CreatePRRecordUseCase } from '../../../application/domain/pr_record/usecase/create-pr-record.usecase';
import { UpdatePrRecordUseCase } from '../../../application/domain/pr_record/usecase/update-pr-record.usecase';
import { RecordAttachmentMapper } from '../../domain/pr_record/persistence/record-attachment.mapper';
import { QueryPrRecordDetailsUseCase } from '../../../application/domain/pr_record/usecase/query-pr-record-details.usecase';

const PR_RECORD_REPOSITORY = TypeOrmModule.forFeature([
    PRRecordTypeormEntity,
    RecordAttachmentTypeormEntity
]);
const PR_RECORD_PORT = { provide: PrRecordPort, useClass: PrRecordPersistenceAdapter };

@Global()
@Module({
    imports: [PR_RECORD_REPOSITORY],
    providers: [
        PR_RECORD_PORT,
        PrRecordMapper,
        RecordAttachmentMapper,
        QueryProjectPrRecordsUseCase,
        CreatePRRecordUseCase,
        UpdatePrRecordUseCase,
        QueryPrRecordDetailsUseCase
    ],
    exports: [PR_RECORD_PORT, PR_RECORD_REPOSITORY],
    controllers: [PrRecordWebAdapter]
})
export class PRRecordModule {}
