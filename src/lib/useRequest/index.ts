import { useState } from 'react'
// import { type } from 'rh-js-methods'

type TParams = any
// type Erro = any 
type TData = any
// type TParams = any

export interface iUseRequestConfig {
  manual?: boolean
  defaultParams?: TParams
  onBefore?: (params: TParams) => void
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void
}

export function useRequest(service: any, config?: iUseRequestConfig): any {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [manual, setManual] = useState(!!config && config.manual)

  async function start(): Promise<void> {
    // if (type(service) !== 'Function') return
    try {
      const result: any = await service()
      setData(result)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  if (!manual) {
    start()
  }

  return { data, error, loading }
}
