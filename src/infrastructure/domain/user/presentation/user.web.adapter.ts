import { Controller, Get } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { QueryMyInfoResponse } from './dto/user.web.dto';

@Controller('users')
export class UserWebAdapter {
    constructor() {}

    @Permission([Authority.USER])
    @Get('/my')
    queryMyInfo(@CurrentUser() user: User): QueryMyInfoResponse {
        return {
            accountId: user.githubAccountId,
            profileImageUrl: user.profileUrl,
        };
    }
}