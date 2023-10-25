import { Global, Module } from '@nestjs/common';
import { AxiosPort } from '../../../application/common/spi/axios.spi';
import { AxiosAdapter } from '../../thirdparty/axios/axios.adapter';

const GITHUB_PORT = { provide: AxiosPort, useClass: AxiosAdapter };

@Global()
@Module({
    providers: [GITHUB_PORT],
    exports: [GITHUB_PORT],
})
export class AxiosModule {
}
