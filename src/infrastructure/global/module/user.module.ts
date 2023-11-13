import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../domain/user/persistence/user.entity';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence.adapter';
import { UserMapper } from '../../domain/user/persistence/user.mapper';
import { UserWebAdapter } from '../../domain/user/presentation/user.web.adapter';
import { UpdateProfileUseCase } from '../../../application/domain/user/usecase/update-profile.usecase';
import { DeleteUserUseCase } from '../../../application/domain/user/usecase/delete-user.usecase';

const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };
const USER_REPOSITORY = TypeOrmModule.forFeature([UserTypeormEntity]);

@Global()
@Module({
    imports: [USER_REPOSITORY],
    controllers: [UserWebAdapter],
    providers: [USER_PORT, UserMapper, UpdateProfileUseCase, DeleteUserUseCase],
    exports: [USER_PORT, USER_REPOSITORY, UserMapper]
})
export class UserModule {}
