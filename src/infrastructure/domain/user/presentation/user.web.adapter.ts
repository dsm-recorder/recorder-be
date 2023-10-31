import { Body, Controller, Delete, Get, HttpCode, Patch } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { UpdateProfileUseCase } from '../../../../application/domain/user/usecase/update-profile.usecase';
import { QueryMyInfoResponse, UpdateProfileRequest } from './dto/user.web.dto';
import { DeleteUserUseCase } from '../../../../application/domain/user/usecase/delete-user.usecase';
import { DeleteUserRequest } from '../../../../application/domain/user/dto/user.dto';

@Controller('users')
export class UserWebAdapter {
    constructor(
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @HttpCode(204)
    @Permission([Authority.USER])
    @Patch('/profile')
    async updateProfile(@CurrentUser() user: User, @Body() request: UpdateProfileRequest) {
        await this.updateProfileUseCase.execute(user, request.profileImageUrl);
    }

    @Permission([Authority.USER])
    @Get('/my')
    queryMyInfo(@CurrentUser() user: User): QueryMyInfoResponse {
        return {
            accountId: user.githubAccountId,
            profileImageUrl: user.profileUrl,
        };
    }

    @Permission([Authority.USER])
    @Delete()
    async deleteUser(@CurrentUser() user: User, @Body() request: DeleteUserRequest) {
        await this.deleteUserUseCase.execute(user, request);
    }
}
