import React from 'react'

export default function Reports() {
  const handleDownload = (type) => {
    window.alert(`Downloading ${type === 'users' ? 'Users Report' : "Ad's Report"} as Excel...`)
  }

  return (
    <div className="page">
      <h1 className="page-title">Reports</h1>
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="report-card-title">Users Reports</div>
          <div className="report-card-sub">Registrations, Activity, Status</div>
          <button className="btn-download" type="button" onClick={() => handleDownload('users')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Excel
          </button>
        </div>

        <div className="report-card">
          <div className="report-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9v18L3 11z" />
              <path d="M11 11.5v3.5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V13" />
            </svg>
          </div>
          <div className="report-card-title">Ad's Report</div>
          <div className="report-card-sub">Views, Clicks, CTR Percentage</div>
          <button className="btn-download" type="button" onClick={() => handleDownload('ads')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Excel
          </button>
        </div>
      </div>
    </div>
  )
}
