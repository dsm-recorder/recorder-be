import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../domain/user/persistence/user.entity';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence.adapter';
import { UserWebAdapter } from '../../domain/user/presentation/user.web.adapter';

const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };
const USER_REPOSITORY = TypeOrmModule.forFeature([UserTypeormEntity]);

@Module({
    imports: [USER_REPOSITORY],
    controllers: [UserWebAdapter],
    providers: [USER_PORT],
    exports: [USER_PORT, USER_REPOSITORY],
})
export class UserModule {
}