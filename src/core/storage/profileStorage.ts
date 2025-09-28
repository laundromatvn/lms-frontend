import { type LMSProfile } from '@shared/types/LMSProfile'

const STORAGE_KEY = 'lms.profile.v1'

export const profileStorage = {
  save(profile: LMSProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // ignore storage errors
    }
  },
  load(): LMSProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as LMSProfile
      if (parsed && typeof parsed === 'object' && (parsed as any).user && (parsed as any).tenant) {
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


