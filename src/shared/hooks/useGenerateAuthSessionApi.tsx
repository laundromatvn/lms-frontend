import axios from 'axios'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'
import { type ApiState } from '@shared/hooks/types'

import { type AuthSession } from '@shared/types/AuthSession';

export type GenerateAuthSessionResponse = AuthSession;

export async function generateAuthSessionApi(): Promise<GenerateAuthSessionResponse> {
  const url = `${getBackendUrl()}/api/v1/auth/sso/generate-sign-in-session`

  const res = await axios.post<GenerateAuthSessionResponse>(url)
  return res.data as GenerateAuthSessionResponse
}

export const useGenerateAuthSessionApi = <T = GenerateAuthSessionResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const generateAuthSession = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }))
    try {
      const data = await generateAuthSessionApi()
      setState({ data: data as T, loading: false, error: null })
      return data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) })
      throw error
    }
  }, [])

  return { ...state, generateAuthSession }
}
