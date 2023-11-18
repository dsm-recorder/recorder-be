import { Injectable } from '@nestjs/common';
import { CommentPort } from '../../../../application/domain/comment/spi/comment.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentTypeormEntity } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentPersistenceAdapter implements CommentPort {
    constructor(
        @InjectRepository(CommentTypeormEntity)
        private readonly commentRepository: Repository<CommentTypeormEntity>
    ) {}


}