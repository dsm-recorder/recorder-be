import { Controller, Get, Query } from '@nestjs/common';
import { CheckSpellUseCase } from '../../../../application/domain/spell/usecase/check-spell.usecase';
import { CheckSpellResponse } from '../../../../application/domain/spell/dto/spell.dto';

@Controller('spells')
export class SpellWebAdapter {
    constructor(private readonly checkSpellUseCase: CheckSpellUseCase) {}

    @Get()
    async checkSpell(@Query('content') content: string): Promise<CheckSpellResponse> {

        return await this.checkSpellUseCase.execute(content);
    }
}
