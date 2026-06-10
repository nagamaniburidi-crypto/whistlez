import React, { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Ads from './pages/Ads'
import Users from './pages/Users'
import Ringtones from './pages/Ringtones'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'

export default function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('whistlezLoggedIn') === 'true')
  const isAuthPage = location.pathname === '/login'

  const handleLogin = () => {
    localStorage.setItem('whistlezLoggedIn', 'true')
    setLoggedIn(true)
  }

  return (
    <div className={`app-layout${isAuthPage ? ' app-layout--auth' : ''}`}>
      {!isAuthPage && <Sidebar />}

      <div className={`main-area${isAuthPage ? ' main-area--auth' : ''}`}>
        {!isAuthPage && <Topbar />}

        <main className={`content${isAuthPage ? ' content--auth' : ''}`}>
          <Routes>
            <Route
              path="/login"
              element={
                loggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              }
            />
            <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/ads" element={loggedIn ? <Ads /> : <Navigate to="/login" replace />} />
            <Route path="/user" element={loggedIn ? <Users /> : <Navigate to="/login" replace />} />
            <Route path="/ringtones" element={loggedIn ? <Ringtones /> : <Navigate to="/login" replace />} />
            <Route path="/reports" element={loggedIn ? <Reports /> : <Navigate to="/login" replace />} />
            <Route path="/settings" element={loggedIn ? <Settings /> : <Navigate to="/login" replace />} />
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
