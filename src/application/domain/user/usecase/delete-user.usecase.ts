import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPort } from '../spi/user.spi';
import { User } from '../user';
import { DeleteUserRequest } from '../dto/user.dto';
import { ProjectPort } from '../../project/spi/project.spi';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
    ) {}

    async execute(user: User, request: DeleteUserRequest) {
        if (user.githubAccountId !== request.accountId) {
            throw new UnauthorizedException('invalid account-id');
        }

        await this.userPort.deleteUser(user);
    }
}
