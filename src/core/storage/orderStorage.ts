import { type Order } from '@shared/types/Order'

const STORAGE_KEY = 'lms.order.v1'

export const orderStorage = {
  save(order: Order): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      // ignore storage errors
    }
  },
  load(): Order | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as Order
      if (parsed && typeof parsed === 'object' && typeof (parsed as any).id === 'string') {
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


