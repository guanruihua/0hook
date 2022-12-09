import React, { FC, useEffect } from 'react'
import { virtualService } from '../../assets'
import { useRequest } from '../../lib'
import './index.less'

export default () => {
  const { data, error, loading } = useRequest(
    virtualService({ name: 'ruihuag' }, 'error123123')
    )
    useEffect((): void => {
      
      console.log({ data, error, loading })
    },[])


  if (error) {
    return <div>failed to load,{error}</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Username: {JSON.stringify(data)}</div>
}
