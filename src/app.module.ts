import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { ProjectModule } from './infrastructure/global/module/project.module';
import { AxiosModule } from './infrastructure/global/module/axios.module';
import { ImageModule } from './infrastructure/global/module/image.module';
import { AwsModule } from './infrastructure/global/module/aws.module';
import { DailyReportModule } from './infrastructure/global/module/daily-report.module';
import { PRRecordModule } from './infrastructure/global/module/pr-record.module';
import { LikeModule } from './infrastructure/global/module/like.module';
import { SpellModule } from './infrastructure/global/module/spell.module';
import { CommentModule } from './infrastructure/global/module/comment.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        ProjectModule,
        CommentModule,
        DailyReportModule,
        AxiosModule,
        TypeormConfigModule,
        ImageModule,
        AwsModule,
        PRRecordModule,
        LikeModule,
        SpellModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
