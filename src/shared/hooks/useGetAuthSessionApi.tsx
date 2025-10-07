import axios from 'axios'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'
import { type ApiState } from '@shared/hooks/types'

import { type AuthSession } from '@shared/types/AuthSession';

export type GetAuthSessionResponse = AuthSession;

export async function getAuthSessionApi(sessionId: string): Promise<GetAuthSessionResponse> {
  const url = `${getBackendUrl()}/api/v1/auth/sso/session/${sessionId}`

  const res = await axios.get<GetAuthSessionResponse>(url)
  return res.data as GetAuthSessionResponse
}

export const useGetAuthSessionApi = <T = GetAuthSessionResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const getAuthSession = useCallback(async (sessionId: string) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }))
    try {
      const data = await getAuthSessionApi(sessionId)
      setState({ data: data as T, loading: false, error: null })
      return data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) })
      throw error
    }
  }, [])

  return { ...state, getAuthSession }
}
