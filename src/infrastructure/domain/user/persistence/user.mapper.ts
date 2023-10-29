import { Injectable } from '@nestjs/common';
import { UserTypeormEntity } from './user.entity';
import { User } from '../../../../application/domain/user/user';

@Injectable()
export class UserMapper {
    toDomain(entity: UserTypeormEntity): User {
        return new User(
            entity.githubAccountId,
            entity.profileUrl,
            entity.authority,
            entity.id,
        );
    }

    toEntity(domain: User): UserTypeormEntity {
        return new UserTypeormEntity(
            domain.githubAccountId,
            domain.profileUrl,
            domain.authority,
            domain.id,
        );
    }
}