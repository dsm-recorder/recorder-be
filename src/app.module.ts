import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { ProjectModule } from './infrastructure/global/module/project.module';
import { GithubModule } from './infrastructure/global/module/github.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProjectModule,
    GithubModule,
    TypeormConfigModule,
    ConfigModule.forRoot({ isGlobal: true })
  ]
})
export class AppModule {}
