import React, { lazy } from 'react'

interface RouterUnit {
	name: string
	path: string
	element: React.ElementType
}


export const routers: RouterUnit[] = [
	{
		name: 'Demo',
		path: '/',
		element: lazy(() => import('./modules/demo'))
	},
	{
		name: 'useRequest',
		path: '/useRequest',
		element: lazy(() => import('./modules/useRequest'))
	},
	{
		name: 'useSetState',
		path: '/useSetState',
		element: lazy(() => import('./modules/useSetState'))
	},
	{
		name: 'useStorage',
		path: '/useStorage',
		element: lazy(() => import('./modules/useStorage'))
	}
]