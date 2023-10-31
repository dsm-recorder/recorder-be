import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { UploadImagePort } from '../spi/image.spi';

@Injectable()
export class UploadImageUseCase {
    constructor(
        @Inject(UploadImagePort)
        private readonly uploadImagePort: UploadImagePort
    ) {}

    async execute(fileName: string, buffer: Buffer) {
        await this.uploadImagePort.uploadImage(fileName, buffer);

        return this.uploadImagePort.getImageUrl(fileName);
    }

}