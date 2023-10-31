import { Inject, Injectable } from '@nestjs/common';
import { UserPort } from '../spi/user.spi';
import { User } from '../user';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
    ) {}

    async execute(user: User) {
        await this.userPort.deleteUser(user);
    }
}
