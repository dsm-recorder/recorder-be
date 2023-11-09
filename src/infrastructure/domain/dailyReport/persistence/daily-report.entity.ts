import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Entity('tbl_daily_report')
export class DailyReportTypeormEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'daily_report_id' })
    id: string;

    @Column({ length: 100, nullable: false })
    content: string;

    @Column({ nullable: false })
    isComplete: boolean;

    @Column({ nullable: false })
    date: Date;

    @ManyToOne(() => ProjectTypeormEntity)
    @JoinColumn()
    project: Promise<ProjectTypeormEntity>;

    constructor(id: string, content: string, isComplete: boolean, date: Date, project: Promise<ProjectTypeormEntity>) {
        this.id = id;
        this.content = content;
        this.isComplete = isComplete;
        this.date = date;
        this.project = project;
    }

}
