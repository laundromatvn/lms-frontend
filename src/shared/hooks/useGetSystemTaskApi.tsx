import axios from 'axios'
import { useCallback, useState } from 'react'

import { getBackendUrl } from '@shared/utils/env'
import { type ApiState } from '@shared/hooks/types'

import { type SystemTask } from '@shared/types/SystemTask';

export type GetSystemTaskResponse = SystemTask;

export async function getSystemTaskApi(systemTaskId: string): Promise<GetSystemTaskResponse> {
  const url = `${getBackendUrl()}/api/v1/system-task/${systemTaskId}`

  const res = await axios.get<GetSystemTaskResponse>(url)
  return res.data as GetSystemTaskResponse
}

export const useGetSystemTaskApi = <T = GetSystemTaskResponse>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const getSystemTask = useCallback(async (systemTaskId: string) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }))
    try {
      const data = await getSystemTaskApi(systemTaskId)
      setState({ data: data as T, loading: false, error: null })
      return data as T
    } catch (error: any) {
      setState({ data: null, loading: false, error: new Error(error.message) })
      throw error
    }
  }, [])

  return { ...state, getSystemTask }
}
