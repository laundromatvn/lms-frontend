import axiosClient from '@core/axiosClient'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'

import { type ApiState } from '@shared/hooks/types'

export type VerifyForStoreConfigurationAccessRequest = {
  tenant_id: string;
}

export type VerifyForStoreConfigurationAccessResponse = any;

export const useVerifyForStoreConfigurationAccessApi = <T = VerifyForStoreConfigurationAccessResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const verifyForStoreConfigurationAccess = useCallback(async ({ tenant_id }: VerifyForStoreConfigurationAccessRequest) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));

    const url = `${getBackendUrl()}/api/v1/auth/verification/store-configuration-access`

    const payload = {
      tenant_id,
    }

    try {
      const response = await axiosClient.post<T>(url.replace(getBackendUrl(), ''), payload)

      setState({ data: response.data as T, loading: false, error: null });
      return response.data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) });
      throw error;
    }
  }, [setState]);

  return { ...state, verifyForStoreConfigurationAccess };
}
