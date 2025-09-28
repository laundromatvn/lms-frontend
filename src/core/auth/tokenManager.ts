import { tokenStorage, type TokenBundle } from './tokenStorage'
import { refreshToken as apiRefreshToken } from './authApi'
import {
  ACCESS_TOKEN_EXPIRY_BUFFER_MS,
  REFRESH_TOKEN_EXPIRY_BUFFER_MS,
  PROACTIVE_REFRESH_THRESHOLD_MS,
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
} from '@core/constant'

type TokenState = TokenBundle | null

class TokenManager {
  private tokens: TokenState
  private refreshingPromise: Promise<string> | null

  constructor() {
    this.tokens = tokenStorage.load()
    this.refreshingPromise = null
  }

  setTokens(tokens: TokenBundle): void {
    this.tokens = tokens
    tokenStorage.save(tokens)
  }

  clear(): void {
    this.tokens = null
    tokenStorage.clear()
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken ?? null
  }

  isAccessTokenExpired(bufferMs = ACCESS_TOKEN_EXPIRY_BUFFER_MS): boolean {
    if (!this.tokens) return true
    const now = Date.now()
    return now + bufferMs >= this.tokens.accessTokenExp
  }

  isRefreshTokenExpired(bufferMs = REFRESH_TOKEN_EXPIRY_BUFFER_MS): boolean {
    if (!this.tokens) return true
    const now = Date.now()
    return now + bufferMs >= this.tokens.refreshTokenExp
  }

  async ensureValidAccessToken(): Promise<string | null> {
    if (!this.tokens) return null

    if (!this.isAccessTokenExpired()) {
      return this.tokens.accessToken
    }

    if (this.isRefreshTokenExpired()) {
      this.clear()
      return null
    }

    if (!this.refreshingPromise) {
      this.refreshingPromise = this.performRefresh()
        .finally(() => {
          this.refreshingPromise = null
        })
    }

    try {
      return await this.refreshingPromise
    } catch {
      this.clear()
      return null
    }
  }

  async proactiveRefresh(): Promise<void> {
    if (!this.tokens) return
    // Refresh when refresh token is within threshold of expiry
    const now = Date.now()
    const timeToExpiry = this.tokens.refreshTokenExp - now
    if (timeToExpiry <= PROACTIVE_REFRESH_THRESHOLD_MS) {
      await this.ensureValidAccessToken()
    }
  }

  // Force a refresh using the current refresh token, even if access token is still valid
  async refreshAccessNow(): Promise<void> {
    if (!this.tokens) return
    if (this.isRefreshTokenExpired()) {
      this.clear()
      return
    }
    if (!this.refreshingPromise) {
      this.refreshingPromise = this.performRefresh()
        .finally(() => {
          this.refreshingPromise = null
        })
    }
    try {
      await this.refreshingPromise
    } catch {
      this.clear()
    }
  }

  // Alias for clarity if we later differentiate behaviors
  async rotateRefreshTokenNow(): Promise<void> {
    await this.refreshAccessNow()
  }

  private async performRefresh(): Promise<string> {
    if (!this.tokens) throw new Error('No tokens to refresh')
    const res = await apiRefreshToken(this.tokens.refreshToken)

    const updated: TokenBundle = {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      accessTokenExp: Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000,
      refreshTokenExp: Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000,
    }
    this.setTokens(updated)
    return updated.accessToken
  }
}

export const tokenManager = new TokenManager()
export type { TokenBundle }


