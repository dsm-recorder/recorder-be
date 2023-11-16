import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { CheckSpellResponse } from '../dto/spell.dto';

@Injectable()
export class CheckSpellUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort,
    ) {}

    async execute(content: string): Promise<CheckSpellResponse> {
        const html = await this.axiosPort.checkSpell(content);
        const data = html.slice(html.indexOf('data = [') + 8, html.lastIndexOf('];'));
        const json = JSON.parse(data);

        return {
            errorInfo: json.errInfo,
        };
    }
}
