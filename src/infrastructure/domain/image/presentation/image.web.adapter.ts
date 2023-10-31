import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageUseCase } from '../../../../application/domain/image/usecase/upload-image.usecase';

@Controller('/images')
export class ImageWebAdapter {

    constructor(
        private readonly uploadImageUseCase: UploadImageUseCase
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe(),
    ) image: Express.Multer.File) {
        return await this.uploadImageUseCase.execute(image.originalname, image.buffer);
    }
}