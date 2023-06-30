import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import UserProfile from './components/Profile/UserProfile'
import PostDetails from './components/PostDetails/PostDetails'
import StartPage from './components/StartPage/StartPage'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<StartPage />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="auth" exact Component={() => !user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/posts/:id" element={<PostDetails />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
