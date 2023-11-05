import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/presistence/project.entity';
import { RecordType } from '../../../../application/domain/pr_record/pr-record';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';

@Entity('tbl_pr_record')
export class PRRecordTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'pr_record_id' })
    id: string;

    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: Promise<ProjectTypeormEntity>;

    @Column('varchar', { length: 1000, nullable: false })
    content: string;

    @Column('varchar', { length: 500 })
    solution: string;

    @Column('varchar', { length: 11, nullable: false })
    type: RecordType;

    @OneToMany(
        () => RecordAttachmentTypeormEntity,
        (recordAttachment) => recordAttachment.prRecord,
        {
            cascade: true,
        },
    )
    recordAttachments: RecordAttachmentTypeormEntity[];
}
