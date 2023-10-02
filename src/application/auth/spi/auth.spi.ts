import { TokenResponse } from '../dto/auth.dto'

export interface JwtPort {
  generateToken(userId: string): Promise<TokenResponse>;
}

export interface OAuthPort {
  getAccessTokenByCode(code: string): Promise<string>;

  getUserInfo(accessToken: string): Promise<any>;
}

export const JwtPort = Symbol('IJwtPort')
export const OAuthPort = Symbol('IOAuthPort')