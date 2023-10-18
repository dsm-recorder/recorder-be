import { Module } from '@nestjs/common';
import { GithubPort } from '../../../application/github/spi/github.spi';
import { GithubAdapter } from '../../thirdparty/github/github.adapter';

const GITHUB_PORT = { provide: GithubPort, useClass: GithubAdapter };

@Module({
  providers: [GITHUB_PORT],
  exports: [GITHUB_PORT]
})
export class GithubModule {}
