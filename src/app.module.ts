import {Module} from '@nestjs/common';
import {UserModule} from "./infrastructure/global/module/user.module";
import {TypeormConfigModule} from "./infrastructure/global/config/typeorm.config";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    TypeormConfigModule,
    ConfigModule.forRoot({isGlobal: true})],
})
export class AppModule {
}
