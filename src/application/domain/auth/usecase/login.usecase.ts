import { Inject, Injectable } from '@nestjs/common';
import { UserPort } from '../../user/spi/user.spi';
import { User } from '../../user/user';
import { JwtPort, OAuthAxiosPort } from '../spi/auth.spi';
import { TokenResponse } from '../dto/auth.dto';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { Authority } from '../../../../infrastructure/domain/user/persistence/user.entity';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        @Inject(AxiosPort)
        private readonly oAuthPort: OAuthAxiosPort,
    ) {}

    async execute(code: string): Promise<TokenResponse> {
        const accessToken = await this.oAuthPort.getAccessTokenByCode(code);
        const githubUserInfo = await this.oAuthPort.getUserInfo(accessToken);
        const user = await this.getUserOrCreate(githubUserInfo.accountId, githubUserInfo.avatarUrl);

        return this.jwtPort.generateToken(user.id);
    }

    private async getUserOrCreate(githubAccountId: string, profileUrl: string): Promise<User> {
        let user: User;
        user = await this.userPort.queryUserByAccountId(githubAccountId);

        if (!user) {
            user = await this.userPort.saveUser({
                githubAccountId,
                profileUrl,
                authority: Authority.USER
            });
        }

        return user;
    }
}