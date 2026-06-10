import React from 'react'
import { NavLink } from 'react-router-dom'
import WhistlezLogo from '../assets/Group_8.svg'

export default function Sidebar() {
  const navClass = ({ isActive }) => isActive ? 'nav-item active' : 'nav-item'

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={WhistlezLogo} alt="Whistlez logo" />
      </div>
      <nav className="nav">
        <NavLink to="/" className={navClass} end>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink to="/user" className={navClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3" />
            <path d="M5.5 21c1.5-3 4.5-5 6.5-5s5 2 6.5 5" />
          </svg>
          Users
        </NavLink>

        <NavLink to="/ringtones" className={navClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0v4l-2 2v1h16v-1l-2-2V8z" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Whistlez Ringtone
        </NavLink>

        <NavLink to="/ads" className={navClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h3l5-5v14l-5-5H4z" />
            <path d="M14 9l7-3v12l-7-3" />
          </svg>
          Ads
        </NavLink>

        <NavLink to="/reports" className={navClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19h16" />
            <path d="M8 15v4" />
            <path d="M12 11v8" />
            <path d="M16 7v12" />
          </svg>
          Reports
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}
