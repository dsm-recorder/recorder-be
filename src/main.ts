import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './infrastructure/global/filter/global.exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.enableCors({
        origin: [
            "https://dsm-recorder.vercel.app/",
            "localhost:3000"
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    });
    await app.listen(3030);
}

bootstrap();
