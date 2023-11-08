import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecordType } from '../../../../application/domain/pr_record/pr-record';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Entity('tbl_pr_record')
export class PRRecordTypeormEntity {
    constructor(
        id: string,
        project: Promise<ProjectTypeormEntity>,
        title: string,
        content: string,
        solution: string,
        type: RecordType,
    ) {
        this.id = id;
        this.project = project;
        this.title = title;
        this.content = content;
        this.solution = solution;
        this.type = type;
    }

    @PrimaryGeneratedColumn('uuid', { name: 'pr_record_id' })
    id: string;

    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: Promise<ProjectTypeormEntity>;

    @Column('varchar', { length: 30, nullable: false })
    title: string;

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
