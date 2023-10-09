import { Controller, Get, Headers, Put, Query, Redirect } from '@nestjs/common';
import { LoginUseCase } from '../../../application/auth/usecase/login.usecase';
import { ConfigService } from '@nestjs/config';
import { TokenReissueUseCase } from '../../../application/auth/usecase/token-reissue.usecase';

@Controller('auth')
export class AuthWebAdapter {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly configService: ConfigService,
    private readonly tokenReissueUseCase: TokenReissueUseCase
  ) {
  }

  @Get('/oauth/github')
  @Redirect()
  githubOAuth() {
    return { url: `https://github.com/login/oauth/authorize?client_id=${this.configService.get<string>('GITHUB_ACCESS')}` };
  }

  @Get('/login')
  async login(@Query('code') code: string) {
    return await this.loginUseCase.execute(code);
  }

  @Put('/reissue')
  async reissueToken(@Headers('Refresh-Token') refreshToken: string) {
    return await this.tokenReissueUseCase.execute(refreshToken);
  }
}