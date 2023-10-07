import { TokenResponse } from '../dto/auth.dto';

export interface JwtPort {
  generateToken(userId: string): Promise<TokenResponse>;

  getSubject(token: string): Promise<string>;
}

export interface OAuthPort {
  getAccessTokenByCode(code: string): Promise<string>;

  getUserInfo(accessToken: string): Promise<any>;
}

export interface RefreshTokenPort {
  queryRefreshTokenByUserId(userId: string): Promise<string>;
}

export const JwtPort = Symbol('IJwtPort');
export const OAuthPort = Symbol('IOAuthPort');
export const RefreshTokenPort = Symbol('IRefreshTokenPort');