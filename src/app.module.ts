import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { ProjectModule } from './infrastructure/global/module/project.module';
import { AxiosModule } from './infrastructure/global/module/axios.module';
import { ImageModule } from './infrastructure/global/module/image.module';
import { AwsModule } from './infrastructure/global/module/aws.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        ProjectModule,
        AxiosModule,
        TypeormConfigModule,
        ImageModule,
        AwsModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {
}
