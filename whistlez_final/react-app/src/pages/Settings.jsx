import React from 'react'

export default function Settings() {
  return (
    <div>
      <h1 className="page-title">Settings</h1>

      <div className="settings-panel">
        <section className="settings-card">
          <h2>General Settings</h2>
          <div className="setting-item">
            <label>Notifications</label>
            <button className="btn-toggle">Enabled</button>
          </div>
          <div className="setting-item">
            <label>Theme</label>
            <span>Light mode</span>
          </div>
          <div className="setting-item">
            <label>Auto updates</label>
            <span>On</span>
          </div>
        </section>

        <section className="settings-card">
          <h2>Account</h2>
          <div className="setting-item">
            <label>Profile visibility</label>
            <span>Public</span>
          </div>
          <div className="setting-item">
            <label>Language</label>
            <span>English</span>
          </div>
          <div className="setting-item">
            <label>Two-factor auth</label>
            <span>Enabled</span>
          </div>
        </section>
      </div>
    </div>
  )
}
