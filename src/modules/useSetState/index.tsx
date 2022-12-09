import React from 'react'
import { useSetState } from '@/assets'

export default () => {
  const [state, updateState] = useSetState({
    name: 'ruihuag',
    age: '24',
    sex: 'man'
  })

  return <div>
    <div>
      <button
        onClick={() => updateState({ name: 'RUIHUAG', 'age': '999' })}>
        update name
      </button>
    </div>
    <div>
      Username:{JSON.stringify(state)}
    </div>
  </div>
}