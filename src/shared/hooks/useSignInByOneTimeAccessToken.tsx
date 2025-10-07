import axios from 'axios'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'

import { type ApiState } from '@shared/hooks/types'

export type SignInByOneTimeAccessTokenRequest = {
  oneTimeAccessToken: string;
}

export type SignInByOneTimeAccessTokenResponse = any;

export const useSignInByOneTimeAccessTokenApi = <T = SignInByOneTimeAccessTokenResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const signInByOneTimeAccessToken = useCallback(async ({ oneTimeAccessToken }: SignInByOneTimeAccessTokenRequest) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    const url = `${getBackendUrl()}/api/v1/auth/sso/sign-in-by-one-time-access-token`

    const body = {
      oneTimeAccessToken,
    }

    try {
      const headers = { 'Content-Type': 'application/json' }
      const response = await axios.post<T>(url, body, { headers })
      setState({ data: response.data as T, loading: false, error: null });
      return response.data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) });
      throw error;
    }
  }, [setState]);

  return { ...state, signInByOneTimeAccessToken };
}
