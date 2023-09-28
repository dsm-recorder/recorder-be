import { Module } from '@nestjs/common';
import {UserModule} from "./infrastructure/global/module/user.module";
import {TypeormConfigModule} from "./infrastructure/global/config/typeorm.config";

@Module({
  imports: [UserModule, TypeormConfigModule],
})
export class AppModule {}
