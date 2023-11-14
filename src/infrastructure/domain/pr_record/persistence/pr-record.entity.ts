import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordType } from '../../../../application/domain/pr_record/pr-record';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Entity('tbl_pr_record')
export class PRRecordTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'pr_record_id' })
    id?: string;

    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectTypeormEntity;

    @Column({ length: 50, nullable: false })
    title: string;

    @Column('varchar', { length: 1000, nullable: false })
    content: string;

    @Column('varchar', { length: 500, nullable: true })
    solution?: string;

    @Column('tinyint', { nullable: false })
    importance: number;

    @Column('tinyint')
    isPublished: boolean;

    @Column('varchar', { length: 11, nullable: false })
    type: RecordType;

    @CreateDateColumn()
    createdAt?: Date;

    @OneToMany(
        () => RecordAttachmentTypeormEntity,
        (recordAttachment) => recordAttachment.prRecord,
        {
            cascade: true,
        },
    )
    recordAttachments: RecordAttachmentTypeormEntity[];

    constructor(
        project: ProjectTypeormEntity,
        title: string,
        content: string,
        importance: number,
        isPublished: boolean,
        type: RecordType,
        solution?: string,
        id?: string,
        createdAt?: Date,
    ) {
        this.id = id;
        this.project = project;
        this.title = title;
        this.content = content;
        this.solution = solution;
        this.importance = importance;
        this.isPublished = isPublished;
        this.type = type;
    }
}
