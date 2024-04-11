import React from 'react'

export function useSetGlobalState(initialState: any) {
  return React.useState(initialState)
}
