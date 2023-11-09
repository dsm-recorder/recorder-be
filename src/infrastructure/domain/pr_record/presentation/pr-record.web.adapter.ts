import { Body, Controller, HttpCode, Param, Post, Query } from '@nestjs/common';
import { CreatePRRecordUseCase } from '../../../../application/domain/pr_record/usecase/create-pr-record.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CreatePRRecordRequest } from '../../../../application/domain/pr_record/dto/pr-record.dto';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';

@Controller('pr-records')
export class PRRecordWebAdapter {
    constructor(private readonly createPRRecordUseCase: CreatePRRecordUseCase) {}

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post(':projectId')
    async createPRRecord(
        @Param('projectId') projectId: string,
        @Body() request: CreatePRRecordRequest,
        @CurrentUser() user: User,
    ) {
        await this.createPRRecordUseCase.execute(projectId, request, user);
    }
}
