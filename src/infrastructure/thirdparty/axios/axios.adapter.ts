import { Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../application/common/spi/axios.spi';
import { QueryRepositoryDetailsResponse, QueryUserInfoResponse, QueryUserRepositoriesResponse } from './dto/github.dto';
import { getAndHandleError } from './util/axios.util';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosAdapter implements AxiosPort {
  constructor(
    private readonly configService: ConfigService
  ){}

  async getUserRepositories(username: string): Promise<QueryUserRepositoriesResponse[]> {
    return await getAndHandleError(`https://api.github.com/users/${username}/repos`);
  }

  async getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse> {
    return await getAndHandleError(`https://api.github.com/repos/${repositoryName}`);
  }

  async getUserInfo(accessToken: string): Promise<QueryUserInfoResponse> {
    const response = (await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })).data;

    return {
      accountId: response.login,
      avatarUrl: response.avatar_url
    };
  }

  async getAccessTokenByCode(code: string): Promise<string> {
    const authenticationUrl = 'https://github.com/login/oauth/access_token';

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', this.configService.get<string>('GITHUB_ACCESS'));
    params.append('client_secret', this.configService.get<string>('GITHUB_SECRET'));
    const response = await axios.post(authenticationUrl, params, {
      headers: { Accept: 'application/json' }
    });

    return response.data.access_token;
  }
}
