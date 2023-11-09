import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import {
    QueryProjectPrRecordsUseCase
} from '../../../../application/domain/pr_record/usecase/query-project-pr-records.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { QueryProjectPrRecordsResponse } from '../../../../application/domain/pr_record/dto/pr-record.dto';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { CreatePRRecordUseCase } from '../../../../application/domain/pr_record/usecase/create-pr-record.usecase';
import { UpdatePrRecordUseCase } from '../../../../application/domain/pr_record/usecase/update-pr-record.usecase';
import { CreatePRRecordRequest, UpdatePrRecordRequest } from './pr-record.web.dto';

@Controller('pr-records')
export class PrRecordWebAdapter {
    constructor(
        private readonly queryProjectPrRecordsUseCase: QueryProjectPrRecordsUseCase,
        private readonly createPRRecordUseCase: CreatePRRecordUseCase,
        private readonly updatePrRecordUseCase: UpdatePrRecordUseCase
    ) {}

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post(':projectId')
    async createPRRecord(
        @Param('projectId') projectId: string,
        @Body() request: CreatePRRecordRequest,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.createPRRecordUseCase.execute(projectId, request, user);
    }

    @Permission([Authority.USER])
    @Get(':projectId')
    async queryProjectPrRecords(@Param('projectId') projectId: string): Promise<QueryProjectPrRecordsResponse> {
        return await this.queryProjectPrRecordsUseCase.execute(projectId);
    }

    @HttpCode(204)
    @Permission([Authority.USER])
    @Patch(':prRecordId')
    async updatePrRecord(@Param('prRecordId') prRecordId: string, @Body() request: UpdatePrRecordRequest): Promise<void> {
        await this.updatePrRecordUseCase.execute(request, prRecordId);
    }
}