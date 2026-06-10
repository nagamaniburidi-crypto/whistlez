import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WhistlezLogo from '../assets/Group_8.svg'

const VALID_EMAIL = 'admin@whistlez.com'
const VALID_PASSWORD = 'admin123'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail !== VALID_EMAIL || password.trim() !== VALID_PASSWORD) {
      setError('Invalid email or password. Please try again.')
      return
    }

    setError('')
    onLogin()
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <img src={WhistlezLogo} alt="Whistlez logo" />
          <div>
            <h1>Whistlez</h1>
            <p>Secure admin login for your dashboard.</p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@whistlez.com"
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="login-error" role="alert">{error}</div>}
          <button type="submit" className="btn-primary login-submit">
            Sign in
          </button>
        </form>

        <div className="login-footer">
          <span>Or continue to the dashboard</span>
          <Link to="/" className="login-link">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
