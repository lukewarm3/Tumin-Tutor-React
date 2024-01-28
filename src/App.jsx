import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import PageLayout from './Layouts/PageLayout'
 
function App() {
  return (
    <>
    <PageLayout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </PageLayout>
    </>
  )
}

export default App
