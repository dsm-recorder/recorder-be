import { Inject, Injectable } from '@nestjs/common';
import { UserPort } from '../../user/spi/user.spi';
import { User } from '../../user/user';
import { JwtPort, OAuthPort } from '../spi/auth.spi';
import { TokenResponse } from '../dto/auth.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    @Inject(JwtPort)
    private readonly jwtPort: JwtPort,
    @Inject(OAuthPort)
    private readonly oAuthPort: OAuthPort
  ) {
  }

  async execute(code: string): Promise<TokenResponse> {
    const accessToken = await this.oAuthPort.getAccessTokenByCode(code);
    const { login, avatar_url } = await this.oAuthPort.getUserInfo(accessToken);
    const user = await this.getUserOrCreate(login, avatar_url);

    return this.jwtPort.generateToken(user.id);
  }

  private async getUserOrCreate(githubAccountId: string, profileUrl: string): Promise<User> {
    let user: User;
    user = await this.userPort.queryUserByAccountId(githubAccountId);

    if (!user) {
      user = await this.userPort.saveUser({
        githubAccountId,
        profileUrl
      });
    }

    return user;
  }
}