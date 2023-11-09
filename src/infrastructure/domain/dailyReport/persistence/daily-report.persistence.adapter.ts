import { DailyReportPort } from '../../../../application/domain/dailyReport/spi/daily-report.spi';
import { Injectable } from '@nestjs/common';
import { convert, LocalDate } from 'js-joda';
import { DailyReport } from '../../../../application/domain/dailyReport/daily-report';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyReportTypeormEntity } from './daily-report.entity';
import { Equal, Repository } from 'typeorm';
import { DailyReportMapper } from './daily-report.mapper';

@Injectable()
export class DailyReportPersistenceAdapter implements DailyReportPort {
    constructor(
        @InjectRepository(DailyReportTypeormEntity)
        private readonly dailyReportRepository: Repository<DailyReportTypeormEntity>,
        private readonly dilayReportMapper: DailyReportMapper
    ) {}

    async queryDailyReportsByDateAndProjectId(date: LocalDate, projectId: string): Promise<DailyReport[]> {
        const dailyReports = await this.dailyReportRepository.find({
            where: {
                date: Equal(convert(date).toDate()),
                project: {
                    id: projectId
                }
            },
            relations: {
                project: true
            }
        });

        return Promise.all(
            dailyReports.map(async (dailyReport) => {
                return await this.dilayReportMapper.toDomain(dailyReport);
            })
        );
    }

    async saveDailyReport(dailyReport: DailyReport): Promise<void> {
        await this.dailyReportRepository.save(
            await this.dilayReportMapper.toEntity(dailyReport)
        );
    }

    async queryDailyReportById(dailyReportId: string): Promise<DailyReport> {
        return await this.dilayReportMapper.toDomain(
            await this.dailyReportRepository.findOne({
                where: {
                    id: dailyReportId
                },
                relations: {
                    project: true
                }
            })
        );
    }

    async deleteDailyReport(dailyReportId: string): Promise<void> {
        await this.dailyReportRepository.createQueryBuilder('dailyReport')
            .delete()
            .where('id = :id', { id: dailyReportId })
            .execute();
    }

    async queryDailyReportsByProjectId(projectId: string): Promise<DailyReport[]> {
        const dailyReports = await this.dailyReportRepository.find({
            where: {
                project: { id: projectId }
            },
            relations: {
                project: true
            },
            order: { date: 'desc' }
        });

        return Promise.all(
            dailyReports.map(async (dailyReport) => {
                return await this.dilayReportMapper.toDomain(dailyReport);
            })
        );
    }

}