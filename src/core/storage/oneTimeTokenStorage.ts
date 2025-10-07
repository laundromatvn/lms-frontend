const STORAGE_KEY = 'lms.one_time_access_token.v1'

export const oneTimeTokenStorage = {
  save(token: string): void {
    try {
      if (typeof token !== 'string' || token.length === 0) return
      localStorage.setItem(STORAGE_KEY, token)
    } catch {
      // ignore storage errors
    }
  },
  load(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      if (typeof raw === 'string' && raw.length > 0) return raw
      return null
    } catch {
      return null
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  },
}


