import { Module } from '@nestjs/common';
import { ImageWebAdapter } from '../../domain/image/presentation/image.web.adapter';
import { UploadImageUseCase } from '../../../application/domain/image/usecase/upload-image.usecase';

@Module({
    controllers: [ImageWebAdapter],
    providers: [UploadImageUseCase],
})
export class ImageModule {}