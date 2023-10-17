import { Module } from '@nestjs/common';
import { AuthWebAdapter } from '../../auth/presentation/auth.web.adapter';
import { LoginUseCase } from '../../../application/auth/usecase/login.usecase';
import { UserModule } from './user.module';
import { RedisCacheModule } from '../config/redis.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtPort, OAuthPort, RefreshTokenPort } from '../../../application/auth/spi/auth.spi';
import { JwtAdapter } from '../security/jwt/jwt.adapter';
import { ConfigService } from '@nestjs/config';
import { OAuthAdapter } from '../../thirdparty/oauth/oauth.adapter';
import { TokenReissueUseCase } from '../../../application/auth/usecase/token-reissue.usecase';
import { RefreshTokenPersistenceAdapter } from '../../auth/persistence/refresh-token.persistence.adapter';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../guard/jwt.guard';

const JWT_PORT = { provide: JwtPort, useClass: JwtAdapter };
const OAUTH_PORT = { provide: OAuthPort, useClass: OAuthAdapter };
const REFRESH_TOKEN_PORT = { provide: RefreshTokenPort, useClass: RefreshTokenPersistenceAdapter };

@Module({
  imports: [UserModule, RedisCacheModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET')
    })
  })],
  controllers: [AuthWebAdapter],
  providers: [
    LoginUseCase,
    TokenReissueUseCase,
    JWT_PORT,
    OAUTH_PORT,
    REFRESH_TOKEN_PORT,
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ]
})
export class AuthModule {
}