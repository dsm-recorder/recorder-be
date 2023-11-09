import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecordType } from '../../../../application/domain/pr_record/pr-record';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Entity('tbl_pr_record')
export class PRRecordTypeormEntity {
    constructor(title: string, project: Promise<ProjectTypeormEntity>, content: string, importance: number, type: RecordType, id?: string, solution?: string) {
        this.id = id;
        this.title = title;
        this.project = project;
        this.content = content;
        this.importance = importance;
        this.solution = solution;
        this.type = type;
    }

    @PrimaryGeneratedColumn('uuid', { name: 'pr_record_id' })
    id: string;

    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'project_id' })
    project: Promise<ProjectTypeormEntity>;

    @Column({ length: 50, nullable: false })
    title: string;

    @Column('varchar', { length: 1000, nullable: false })
    content: string;

    @Column('varchar', { length: 500, nullable: true })
    solution?: string;

    @Column('tinyint', { nullable: false })
    importance: number;

    @Column('varchar', { length: 11, nullable: false })
    type: RecordType;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(
        () => RecordAttachmentTypeormEntity,
        (recordAttachment) => recordAttachment.prRecord,
        {
            cascade: true
        }
    )
    recordAttachments: RecordAttachmentTypeormEntity[];
}
