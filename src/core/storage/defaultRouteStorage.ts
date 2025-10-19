const STORAGE_KEY = 'lms.kiosk.defaultRoute.v1'

export const defaultRouteStorage = {
  save(path: string): void {
    try {
      if (typeof path !== 'string' || path.length === 0) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(path))
    } catch {
      // ignore storage errors
    }
  },
  load(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return typeof parsed === 'string' ? parsed : null
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


