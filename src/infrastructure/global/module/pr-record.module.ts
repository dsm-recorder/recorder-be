import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRRecordTypeormEntity } from '../../domain/pr_record/persistence/pr-record.entity';
import { RecordAttachmentTypeormEntity } from '../../domain/pr_record/persistence/record-attachment.entity';
import { PRRecordPort } from '../../../application/domain/pr_record/spi/pr-record.spi';
import { PRRecordPersistenceAdapter } from '../../domain/pr_record/persistence/pr-record.persistence.adapter';
import { ProjectModule } from './project.module';
import { CreatePRRecordUseCase } from '../../../application/domain/pr_record/usecase/create-pr-record.usecase';
import { PrRecordMapper } from '../../domain/pr_record/persistence/pr-record.mapper';
import { PRRecordWebAdapter } from '../../domain/pr_record/presentation/pr-record.web.adapter';

const PR_RECORD_REPOSITORY = TypeOrmModule.forFeature([
    PRRecordTypeormEntity,
    RecordAttachmentTypeormEntity
]);
const PR_RECORD_PORT = { provide: PRRecordPort, useClass: PRRecordPersistenceAdapter };

@Module({
    imports: [PR_RECORD_REPOSITORY, ProjectModule],
    providers: [CreatePRRecordUseCase, PrRecordMapper, PR_RECORD_PORT],
    exports: [PR_RECORD_REPOSITORY, PR_RECORD_PORT],
    controllers: [PRRecordWebAdapter]
})
export class PRRecordModule {}
