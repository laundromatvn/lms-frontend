import axiosClient from '@core/axiosClient'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'
import { type ApiState } from '@shared/hooks/types'

export type TriggerPaymentTimeoutResponse = any;

export async function triggerPaymentTimeoutApi(order_id: string): Promise<TriggerPaymentTimeoutResponse> {
  const url = `${getBackendUrl()}/api/v1/order/${order_id}/trigger-payment-timeout`

  const res = await axiosClient.post<TriggerPaymentTimeoutResponse>(url.replace(getBackendUrl(), ''))
  return res.data as TriggerPaymentTimeoutResponse
}

export const useTriggerPaymentTimeoutApi = <T = TriggerPaymentTimeoutResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const triggerPaymentTimeout = useCallback(async (order_id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await triggerPaymentTimeoutApi(order_id)
      setState({ data: data as T, loading: false, error: null })
      return data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) })
      throw error
    }
  }, [])

  return { ...state, triggerPaymentTimeout }
}
