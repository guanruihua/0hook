export function virtualService<xResult = any, xError = any>(
  result: xResult,
  error: xError,
  flag = true,
  delay = 500
): () => Promise<any> {
  return function (): Promise<xResult | xError> {
    return new Promise((
      resolve: (value: xResult) => void,
      reject: (reason?: xError) => void
    ): void => {
      setTimeout((): void => {
        flag && resolve(result)
        !flag && reject(error)
      }, delay)
    }
    )
  }
}
