import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { CheckSpellResponse } from '../dto/spell.dto';

@Injectable()
export class CheckSpellUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort
    ) {}

    async execute(content: string): Promise<CheckSpellResponse> {
        const html = await this.axiosPort.checkSpell(content);
        const data = html.slice(html.indexOf('data = [') + 8, html.lastIndexOf('];'));
        let json;
        try {
            const json = JSON.parse(data);
        } catch (e) {
            throw new BadRequestException(
                '맞춤법과 문법 오류를 찾지 못했습니다. 기술적 한계로 찾지 못한 맞춤법 오류나 문법 오류가 있을 수 있습니다.'
            );
        }

        return {
            errorInfo: json.errInfo
        };
    }
}
