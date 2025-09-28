const STORAGE_KEY = 'lms.store.id.v1'

export const storeStorage = {
  save(storeId: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storeId))
    } catch {
      // ignore storage errors
    }
  },
  load(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (typeof parsed === 'string' && parsed.length > 0) {
        return parsed
      }
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
