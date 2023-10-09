import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { UserPort } from '../../../application/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../user/persistence/user.persistence.adapter';

const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeormEntity])],
  providers: [USER_PORT],
  exports: [USER_PORT]
})
export class UserModule {
}