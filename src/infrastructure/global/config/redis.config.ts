import { CacheModule } from '@nestjs/cache-manager'
import { RedisClientOptions } from 'redis'
import { redisStore } from 'cache-manager-redis-yet'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RefreshTokenRepository } from '../../auth/persistence/repository/refresh-token.repository'

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        socket: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT')
        }
      })
    })
  ],
  providers: [RefreshTokenRepository],
  exports: [RefreshTokenRepository]
})
export class RedisCacheModule {
}