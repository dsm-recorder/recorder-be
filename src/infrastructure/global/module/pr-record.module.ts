import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRRecordTypeormEntity } from '../../domain/pr_record/persistence/pr-record.entity';
import { RecordAttachmentTypeormEntity } from '../../domain/pr_record/persistence/record-attachment.entity';

const PR_RECORD_REPOSITORY = TypeOrmModule.forFeature([
    PRRecordTypeormEntity,
    RecordAttachmentTypeormEntity,
]);

@Module({
    imports: [PR_RECORD_REPOSITORY],
})
export class PRRecordModule {}
