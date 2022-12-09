// import React from 'react'
// import { useSetState } from '@/assets'

// export default () => {
//   const [state, updateState] = useSetState({
//     name: 'ruihuag',
//     age: '24',
//     sex: 'man'
//   })

//   return <div>
//     <div>
//       <button
//         onClick={() => updateState({ name: 'RUIHUAG', 'age': '999' })}>
//         update name
//       </button>
//     </div>
//     <div>
//       Username:{JSON.stringify(state)}
//     </div>
//   </div>
// }

import { useState } from 'react'

export function useSetState<T extends Record<string, any>>(initialState: T = {} as T)
  : [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] {

  const [state, setState] = useState<T>(initialState)
  return [
    state,
    (patch: Partial<T> | ((prevState: T) => Partial<T>)): void => {
      if (typeof patch === 'function') {
        setState({ ...state, ...patch(state) })
      } else {
        setState({ ...state, ...patch })
      }
    }
  ]

}
