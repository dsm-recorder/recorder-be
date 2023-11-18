import { Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../application/common/spi/axios.spi';
import {
    QueryOrganizationsResponse,
    QueryRepositoriesResponse,
    QueryRepositoryDetailsResponse,
    QueryUserInfoResponse
} from './dto/github.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosAdapter implements AxiosPort {
    constructor(private readonly configService: ConfigService) {}

    async getUserRepositories(username: string): Promise<QueryRepositoriesResponse[]> {
        return (await axios.get(`https://api.github.com/users/${username}/repos`)).data;
    }

    async getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse> {
        return await axios
            .get(`https://api.github.com/repos/${repositoryName}`)
            .then((response) => response.data);
    }

    async getUserInfo(accessToken: string): Promise<QueryUserInfoResponse> {
        const response = (
            await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        ).data;

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

    async getOrganizationsByUsername(username: string): Promise<QueryOrganizationsResponse[]> {
        return (await axios.get(`https://api.github.com/users/${username}/orgs`)).data;
    }

    async getOrganizationRepositories(organization: string): Promise<QueryRepositoriesResponse[]> {
        const response =
            (await axios.get(`https://api.github.com/orgs/${organization}/repos`)).data;

        return response.map((item): QueryRepositoriesResponse => {
            return {
                full_name: item.full_name,
                description: item.description,
                language: item.language
            };
        });
    }

    async checkSpell(content: string): Promise<string> {
        const response = await axios.post(`http://164.125.7.61/speller/results?text1=${content}`);
        return response.data;
    }
}
