import {Module} from "@nestjs/common";
import {AuthWebAdapter} from "../../auth/presentation/auth.web.adapter";
import {LoginUseCase} from "../../../application/auth/usecase/login-usecase";
import {UserModule} from "./user.module";
import {RedisCacheModule} from "../config/redis.config";
import {JwtModule} from "@nestjs/jwt";
import {JwtPort, OAuthPort} from "../../../application/auth/spi/auth.spi";
import {JwtAdapter} from "../security/jwt/jwt.adapter";
import {ConfigService} from "@nestjs/config";
import {OAuthAdapter} from "../../thirdparty/oauth/oauth.adapter";

const JWT_PORT = {provide: JwtPort, useClass: JwtAdapter}
const OAUTH_PORT = {provide: OAuthPort, useClass: OAuthAdapter}

@Module({
  imports: [UserModule, RedisCacheModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET')
    })
  })],
  controllers: [AuthWebAdapter],
  providers: [LoginUseCase, JWT_PORT, OAUTH_PORT]
})
export class AuthModule {}