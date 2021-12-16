import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import User from './pages/User'
import FormUser from './pages/FormUser'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/users" element={<Home />} />
          <Route path="/users/:slug" element={<User />} />
          <Route path="/formuser" element={<FormUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App