import React, { useEffect, useMemo, useState } from 'react'

const usersData = [
  { sno:'01', name:'Venky K.', email:'venky@buzzsounds.com', phone:'+91 84569 65478', joined:'Oct 24, 2023', joinedTs: new Date('2023-10-24'), avatarType:'image', avatarSrc:'https://randomuser.me/api/portraits/men/32.jpg', initials:'V', color:'#a78bfa' },
  { sno:'02', name:'Alice Smith', email:'alice@soundart.io', phone:'+91 94569 65478', joined:'Oct 22, 2023', joinedTs: new Date('2023-10-22'), avatarType:'initials', initials:'A', color:'#86efac' },
  { sno:'03', name:'Bob Johnson', email:'bjohnson@design.co', phone:'+91 77789 45896', joined:'Oct 19, 2023', joinedTs: new Date('2023-10-19'), avatarType:'initials', initials:'B', color:'#fca5a5' },
  { sno:'04', name:'Venky K.', email:'venky@buzzsounds.com', phone:'+91 84569 65478', joined:'Oct 24, 2023', joinedTs: new Date('2023-10-24'), avatarType:'image', avatarSrc:'https://randomuser.me/api/portraits/men/45.jpg', initials:'V', color:'#a78bfa' },
  { sno:'05', name:'Alice Smith', email:'alice@soundart.io', phone:'+91 94569 65478', joined:'Oct 22, 2023', joinedTs: new Date('2023-10-22'), avatarType:'initials', initials:'A', color:'#86efac' },
  { sno:'06', name:'Alice Smith', email:'alice@soundart.io', phone:'+91 94569 65478', joined:'Oct 22, 2023', joinedTs: new Date('2023-10-22'), avatarType:'image', avatarSrc:'https://randomuser.me/api/portraits/women/44.jpg', initials:'A', color:'#86efac' },
  { sno:'07', name:'Bob Johnson', email:'bjohnson@design.co', phone:'+91 77789 45896', joined:'Oct 19, 2023', joinedTs: new Date('2023-10-19'), avatarType:'image', avatarSrc:'https://randomuser.me/api/portraits/men/65.jpg', initials:'B', color:'#fca5a5' },
  { sno:'08', name:'Venky K.', email:'venky@buzzsounds.com', phone:'+91 84569 65478', joined:'Oct 24, 2023', joinedTs: new Date('2023-10-24'), avatarType:'initials', initials:'V', color:'#a78bfa' },
  { sno:'09', name:'Gukesh Kumar', email:'gukeshkumar@gamil.com', phone:'+91 77789 45896', joined:'Oct 19, 2023', joinedTs: new Date('2023-10-19'), avatarType:'initials', initials:'G', color:'#6ee7b7' },
  { sno:'10', name:'Clara Oswald', email:'clara@spacetime.org', phone:'+91 68296 68873', joined:'Oct 15, 2023', joinedTs: new Date('2023-10-15'), avatarType:'image', avatarSrc:'https://randomuser.me/api/portraits/women/68.jpg', initials:'C', color:'#f9a8d4' }
]

const sortOptions = [
  { value: 'joined-desc', label: 'Joined Date (Newest)' },
  { value: 'joined-asc', label: 'Joined Date (Oldest)' },
  { value: 'name-asc', label: 'Name (A → Z)' },
  { value: 'name-desc', label: 'Name (Z → A)' }
]

const ROWS_PER_PAGE = 10

function sortUsers(list, sort) {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'joined-asc': return a.joinedTs - b.joinedTs
      case 'joined-desc': return b.joinedTs - a.joinedTs
      case 'name-asc': return a.name.localeCompare(b.name)
      case 'name-desc': return b.name.localeCompare(a.name)
      default: return 0
    }
  })
}

function Avatar({ user }) {
  const [imgError, setImgError] = useState(false)

  if (user.avatarType === 'image' && !imgError) {
    return (
      <>
        <img
          className="avatar"
          src={user.avatarSrc}
          alt={user.name}
          onError={() => setImgError(true)}
        />
        <div className="avatar-initials" style={{ background: user.color, display: 'none' }}>{user.initials}</div>
      </>
    )
  }

  return (
    <div className="avatar-initials" style={{ background: user.color }}>
      {user.initials}
    </div>
  )
}

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState('joined-desc')
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (!dropdownOpen) return
    const handleOutsideClick = () => setDropdownOpen(false)
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [dropdownOpen])

  const filteredUsers = useMemo(() => {
    const matched = usersData.filter(user => {
      const query = searchQuery.trim().toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    })
    return sortUsers(matched, sortKey)
  }, [searchQuery, sortKey])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ROWS_PER_PAGE))
  const pageUsers = filteredUsers.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)

  const selectedLabel = sortOptions.find(option => option.value === sortKey)?.label || 'Joined Date'

  function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  function handleSort(value) {
    setSortKey(value)
    setPage(1)
    setDropdownOpen(false)
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Users</h1>

      <div className="table-card">
        <div className="toolbar">
          <div className="search-box">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2 4 12 13 22 4" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1) }}
              placeholder="Search name, email..."
            />
          </div>
          <div className="filter-group">
            <span className="filter-label">Filter by</span>
            <button
              type="button"
              className={`filter-btn ${dropdownOpen ? 'open' : ''}`}
              onClick={e => { e.stopPropagation(); setDropdownOpen(open => !open) }}
            >
              <span>{selectedLabel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`filter-dropdown ${dropdownOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
              {sortOptions.map(option => (
                <div
                  key={option.value}
                  className={`filter-dropdown-item ${sortKey === option.value ? 'selected' : ''}`}
                  onClick={() => handleSort(option.value)}
                >
                  {option.label}
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PROFILE</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>JOINED</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#9ca3af', fontSize: '13px' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              pageUsers.map(user => (
                <tr key={user.sno + user.email}>
                  <td>{user.sno}</td>
                  <td><Avatar user={user} /></td>
                  <td className="name-cell">{user.name}</td>
                  <td className="email-cell">{user.email}</td>
                  <td className="phone-cell">{user.phone}</td>
                  <td className="joined-cell">{user.joined}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn nav-btn" type="button" onClick={() => changePage(page - 1)} disabled={page === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              className={`page-btn ${pageNumber === page ? 'active' : ''}`}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button className="page-btn nav-btn" type="button" onClick={() => changePage(page + 1)} disabled={page === totalPages}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
