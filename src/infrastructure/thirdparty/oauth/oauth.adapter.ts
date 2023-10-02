import { OAuthPort } from '../../../application/auth/spi/auth.spi'
import axios from 'axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OAuthAdapter implements OAuthPort {
  constructor(
    private readonly configService: ConfigService
  ) {
  }

  async getUserInfo(accessToken: string): Promise<any> {
    return await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  }

  async getAccessTokenByCode(code: string): Promise<string> {
    const authenticationUrl = 'https://github.com/login/oauth/access_token'

    const params = new URLSearchParams()
    params.append('code', code)
    params.append('client_id', this.configService.get<string>('GITHUB_ACCESS'))
    params.append('client_secret', this.configService.get<string>('GITHUB_SECRET'))
    const response = await axios.post(authenticationUrl, params, {
      headers: { Accept: 'application/json' }
    })

    return response.data.access_token
  }

}