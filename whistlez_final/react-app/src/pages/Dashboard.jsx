import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 1))
  const [calendarMonth, setCalendarMonth] = useState(selectedDate.getMonth())
  const [calendarYear, setCalendarYear] = useState(selectedDate.getFullYear())
  const [showCalendarPicker, setShowCalendarPicker] = useState(false)
  const pickerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowCalendarPicker(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (showCalendarPicker) {
      setCalendarMonth(selectedDate.getMonth())
      setCalendarYear(selectedDate.getFullYear())
    }
  }, [showCalendarPicker, selectedDate])

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getCalendarGrid = (year, month) => {
    const days = getDaysInMonth(year, month)
    const startDay = new Date(year, month, 1).getDay()
    const grid = Array.from({ length: startDay }).fill(null)
    for (let day = 1; day <= days; day += 1) {
      grid.push(day)
    }
    return grid
  }

  const getDailyValues = (year, month) => {
    const days = getDaysInMonth(year, month)
    return Array.from({ length: days }, (_, idx) => {
      const base = 40 + ((month * 6 + idx * 5) % 45)
      const variance = Math.round(Math.sin((idx + month * 2) / 4) * 5)
      return Math.max(28, base + variance)
    })
  }

  const selectedMonthIndex = selectedDate.getMonth()
  const selectedYearValue = selectedDate.getFullYear()
  const selectedDay = selectedDate.getDate()
  const formattedMonthYear = `${MONTHS[selectedMonthIndex]} ${String(selectedDay).padStart(2, '0')}, ${selectedYearValue}`

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">TOTAL USERS</span>
            <span className="stat-value">12,480</span>
            <span className="stat-sub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              +18% this week
            </span>
          </div>
          <div className="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">TOTAL RINGTONES</span>
            <span className="stat-value">1,842</span>
            <span className="stat-sub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              +42 new today
            </span>
          </div>
          <div className="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">ACTIVE ADS</span>
            <span className="stat-value">8</span>
            <span className="stat-sub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Max limit reached
            </span>
          </div>
          <div className="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9v18L3 11z"/>
              <path d="M11 11.5v3.5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V13"/>
            </svg>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW */}
      <div className="middle-row">
        <div className="chart-card">
          <h2 className="card-title">Usage &amp; Growth</h2>
          <div className="chart-box">
            <div className="chart-top-row">
              <span className="chart-sublabel">User Growth</span>
              <div className="month-picker-container" ref={pickerRef}>
                <button type="button" className="month-picker-btn" onClick={() => setShowCalendarPicker((open) => !open)}>
                  <span>{formattedMonthYear}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path d="M4 9h16" />
                    <path d="M8 4v4" />
                    <path d="M16 4v4" />
                  </svg>
                </button>
                {showCalendarPicker && (
                  <div className="calendar-picker-panel">
                    <div className="calendar-header">
                      <button type="button" className="calendar-nav-button" onClick={() => {
                        const prev = new Date(calendarYear, calendarMonth - 1, 1)
                        setCalendarYear(prev.getFullYear())
                        setCalendarMonth(prev.getMonth())
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>
                      <div className="calendar-title">{MONTHS[calendarMonth]} {calendarYear}</div>
                      <button type="button" className="calendar-nav-button" onClick={() => {
                        const next = new Date(calendarYear, calendarMonth + 1, 1)
                        setCalendarYear(next.getFullYear())
                        setCalendarMonth(next.getMonth())
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                    <div className="calendar-weekdays">
                      {WEEKDAYS.map((weekday) => (
                        <span key={weekday} className="calendar-weekday">{weekday}</span>
                      ))}
                    </div>
                    <div className="calendar-days">
                      {getCalendarGrid(calendarYear, calendarMonth).map((day, idx) => (
                        day ? (
                          <button
                            key={`${calendarYear}-${calendarMonth}-${day}`}
                            type="button"
                            className={`calendar-day ${selectedDate.getDate() === day && selectedDate.getMonth() === calendarMonth && selectedDate.getFullYear() === calendarYear ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedDate(new Date(calendarYear, calendarMonth, day))
                              setShowCalendarPicker(false)
                            }}
                          >
                            {String(day).padStart(2, '0')}
                          </button>
                        ) : (
                          <span key={`empty-${idx}`} className="calendar-empty" />
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <svg className="chart-svg" viewBox="0 0 520 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {(() => {
                const dailyValues = getDailyValues(selectedMonthIndex, selectedYearValue)
                const maxValue = Math.max(...dailyValues, 1)
                const svgWidth = 520
                const chartPadding = 10
                const barWidth = 10
                const chartLeft = chartPadding
                const chartRight = svgWidth - chartPadding
                const chartBottom = 148
                const chartMaxHeight = 98
                const visibleBars = dailyValues.length
                const totalSpacing = chartRight - chartLeft - visibleBars * barWidth
                const barSpacing = visibleBars > 1 ? totalSpacing / (visibleBars - 1) : 0

                return dailyValues.map((value, idx) => {
                  const barHeight = Math.max(28, Math.round((value / maxValue) * chartMaxHeight))
                  const x = chartLeft + idx * (barWidth + barSpacing)
                  const y = chartBottom - barHeight
                  const dateLabel = String(idx + 1).padStart(2, '0')
                  const fillColor = idx + 1 === selectedDay ? '#7C3AED' : '#A78BFA'

                  return (
                    <g key={idx}>
                      <rect x={x} y={y} width={barWidth} height={barHeight} rx="3" fill={fillColor} />
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="12" fill="#4B5563" fontFamily="Inter,sans-serif" fontWeight="600">
                        {value}
                      </text>
                      <text x={x + barWidth / 2} y="168" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">
                        {dateLabel}
                      </text>
                    </g>
                  )
                })
              })()}
              <path d="M10 150 H 510" stroke="#F3F2FB" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="quick-card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="quick-actions">
            <div className="quick-row">
              <button className="btn-primary" onClick={() => navigate('/ringtones')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Add Ringtone
              </button>
              <button className="btn-outline-purple" type="button" onClick={() => navigate('/ads')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l19-9v18L3 11z"/>
                </svg>
                Create Ad
              </button>
            </div>
            <button className="btn-outline-grey" onClick={() => navigate('/user')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              View Users
            </button>
          </div>
        </div>
      </div>

      {/* TODAY USER TABLE */}
      <div className="table-card">
        <div className="table-head-row">
          <h2 className="card-title">Today User</h2>
          <Link to="/user" className="view-all-link">View All</Link>
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>S.NO</th><th>PROFILE</th><th>NAME</th>
              <th>EMAIL</th><th>PHONE NUMBER</th><th>JOINED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="sno">01</td>
              <td><img className="avatar-photo" src="https://i.pravatar.cc/40?img=11" alt="Venky K."/></td>
              <td className="uname">Venky K.</td>
              <td>venky@buzzsounds.com</td>
              <td>+91 84569 65478</td>
              <td>Oct 24, 2023</td>
            </tr>
            <tr>
              <td className="sno">02</td>
              <td><div className="avatar-letter green">A</div></td>
              <td className="uname">Alice Smith</td>
              <td>alice@soundart.io</td>
              <td>+91 94569 65478</td>
              <td>Oct 22, 2023</td>
            </tr>
            <tr>
              <td className="sno">03</td>
              <td><img className="avatar-photo" src="https://i.pravatar.cc/40?img=5" alt="Clara Oswald"/></td>
              <td className="uname">Clara Oswald</td>
              <td>clara@spacetime.org</td>
              <td>+91 68296 68873</td>
              <td>Oct 15, 2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
