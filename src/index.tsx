import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { routers } from './router'
import './index.less'

function Loading() {
  return <div>Loading</div>
}

createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      <div className='foot-Contianer'>
        {routers.map(item => <Link
          key={item.name}
          to={item.path}>
          {item.name}
        </Link>)}
      </div>
      <Routes>
        {routers.map(item => <Route
          key={item.name}
          path={item.path}
          element={
            <Suspense fallback={<Loading />}>
              {React.createElement(item.element)}
            </Suspense>
          } />)}
      </Routes>
    </Router>
  </div>
)
