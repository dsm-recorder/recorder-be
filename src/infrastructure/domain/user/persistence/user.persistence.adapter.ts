import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import { User } from '../../../../application/domain/user/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPersistenceAdapter implements UserPort {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>
  ) {
  }

  async queryUserByAccountId(accountId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ githubAccountId: accountId });
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

}