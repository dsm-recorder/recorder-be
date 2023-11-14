
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeTypeormEntity } from '../../domain/like/persistence/like.entity';
import { LikeUseCase } from '../../../application/domain/like/usecase/like.usecase';
import { LikeWebAdapter } from '../../domain/like/presentation/like.web.adapter';
import { LikePersistenceAdapter } from '../../domain/like/persistence/like.persistence.adapter';
import { LikePort } from '../../../application/domain/like/spi/like.spi';
import { LikeMapper } from '../../domain/like/persistence/like.mapper';

const LIKE_REPOSITORY = TypeOrmModule.forFeature([LikeTypeormEntity]);
const LIKE_PORT = { provide: LikePort, useClass: LikePersistenceAdapter };

@Global()
@Module({
    imports: [LIKE_REPOSITORY],
    exports: [LIKE_REPOSITORY, LIKE_PORT],
    providers: [LikeUseCase, LIKE_PORT, LikeMapper],
    controllers: [LikeWebAdapter],
})
export class LikeModule {}
