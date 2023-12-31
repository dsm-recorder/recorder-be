import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import { User } from '../../../../application/domain/user/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserPersistenceAdapter implements UserPort {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        private readonly userMapper: UserMapper
    ) {}

    async queryUserByAccountId(accountId: string): Promise<User> {
        return this.userMapper.toDomain(
            await this.userRepository.findOneBy({ githubAccountId: accountId })
        );
    }

    async saveUser(user: User): Promise<User> {
        return this.userMapper.toDomain(
            await this.userRepository.save(this.userMapper.toEntity(user))
        );
    }

    async deleteUser(user: User) {
        await this.userRepository.remove(this.userMapper.toEntity(user));
    }
}
