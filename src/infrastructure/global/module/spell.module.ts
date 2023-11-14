import { Module } from '@nestjs/common';
import { CheckSpellUseCase } from '../../../application/domain/spell/usecase/check-spell.usecase';
import { SpellWebAdapter } from '../../domain/spell/presentation/spell.web.adapter';

@Module({
    providers: [CheckSpellUseCase],
    controllers: [SpellWebAdapter],
})
export class SpellModule {}
