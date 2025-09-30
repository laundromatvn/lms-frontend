import { type Payment } from '@shared/types/Payment'

const STORAGE_KEY = 'lms.payment.v1'

export const paymentStorage = {
  save(payment: Payment): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payment))
    } catch {
      // ignore storage errors
    }
  },
  load(): Payment | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as Payment
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


