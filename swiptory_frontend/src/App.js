import React from 'react'
import './App.css'
import AppRoutes from './routes'
import { Appbar } from './Components'

const App = () => {
  return (
    <>
      <Appbar>
        <AppRoutes />
      </Appbar>
    </>
  )
}

export default App