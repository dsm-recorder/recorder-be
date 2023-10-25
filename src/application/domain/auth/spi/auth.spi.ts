import { TokenResponse } from '../dto/auth.dto';
import { QueryUserInfoResponse } from '../../../../infrastructure/thirdparty/axios/dto/github.dto';

export interface JwtPort {
  generateToken(userId: string): Promise<TokenResponse>;

  getSubject(token: string): Promise<string>;
}

export interface OAuthAxiosPort {
  getAccessTokenByCode(code: string): Promise<string>;

  getUserInfo(accessToken: string): Promise<QueryUserInfoResponse>;
}

export interface RefreshTokenPort {
  queryRefreshTokenByUserId(userId: string): Promise<string>;
}

export const JwtPort = Symbol('IJwtPort');
export const RefreshTokenPort = Symbol('IRefreshTokenPort');