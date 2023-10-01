import {Controller, Get, Post, Query, Redirect} from "@nestjs/common";
import {LoginUseCase} from "../../../application/auth/usecase/login-usecase";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
export class AuthWebAdapter {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly configService: ConfigService
  ) {
  }

  @Get('/oauth/github')
  @Redirect()
  githubOAuth() {
    return { url: `https://github.com/login/oauth/authorize?client_id=${this.configService.get<string>('GITHUB_ACCESS')}`};
  }

  @Get('/login')
  async login(@Query('code') code: string) {
    return await this.loginUseCase.execute(code)
  }
}