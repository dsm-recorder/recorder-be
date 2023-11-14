import { Body, Controller, Post } from '@nestjs/common';
import { CheckSpellUseCase } from '../../../../application/domain/spell/usecase/check-spell.usecase';
import { CheckSpellRequest } from './dto/spell.web.dto';
import { CheckSpellResponse } from '../../../../application/domain/spell/dto/spell.dto';

@Controller('spell')
export class SpellWebAdapter {
    constructor(private readonly checkSpellUseCase: CheckSpellUseCase) {}

    @Post()
    async checkSpell(@Body() request: CheckSpellRequest): Promise<CheckSpellResponse> {
        return await this.checkSpellUseCase.execute(request.content);
    }
}
