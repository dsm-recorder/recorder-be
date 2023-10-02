import { JwtPort } from '../../../../application/auth/spi/auth.spi'
import { JwtService } from '@nestjs/jwt'
import { TokenResponse } from '../../../../application/auth/dto/auth.dto'
import { Injectable } from '@nestjs/common'
import { RefreshTokenRepository } from '../../../auth/persistence/repository/refresh-token.repository'

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {
  }

  async generateToken(userId: string): Promise<TokenResponse> {
    const accessToken = await this.signJwtToken(userId, '1h', 'access')
    const refreshToken = await this.signJwtToken(userId, '2w', 'refresh')

    await this.refreshTokenRepository.save({
      userId,
      token: refreshToken
    })

    return {
      accessToken,
      refreshToken
    }
  }

  private async signJwtToken(userId: string, exp: string, typ: string) {
    return await this.jwtService.signAsync(
      { sub: userId, typ },
      { expiresIn: exp }
    )
  }
}