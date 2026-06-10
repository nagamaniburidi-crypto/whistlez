import React from 'react'

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-right">
        <div className="notif-btn" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="notif-dot"></span>
        </div>
        <div className="admin-profile">
          <div className="admin-info">
            <span className="admin-name">Admin Profile</span>
            <span className="admin-email">admin@visily.com</span>
          </div>
          <div className="admin-avatar">A</div>
        </div>
      </div>
    </header>
  )
}
