import React, { useEffect, useRef, useState } from 'react'

function IconButton({ title, children, className, onClick }) {
  return (
    <button className={`icon-btn ${className || ''}`} type="button" title={title} onClick={onClick}>
      {children}
    </button>
  )
}

function AdCard({ ad, onToggleStatus, onDelete, onEdit }) {
  return (
    <div className="ad-card">
      <div className="ad-img-wrap">
        <img src={ad.image} alt={`${ad.title} preview`} className="ad-img" />
        <span className="ad-preview-badge">Ad Preview</span>
        <div className="ad-card-actions">
          <span className={`status-badge ${ad.status === 'Running' ? 'running' : 'paused'}`}>{ad.status}</span>
          <IconButton title="Edit" onClick={() => onEdit(ad.id)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </IconButton>
          <IconButton title={ad.status === 'Running' ? 'Pause' : 'Play'} onClick={() => onToggleStatus(ad.id)}>
            {ad.status === 'Running' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </IconButton>
          <IconButton title="Delete" className="icon-delete" onClick={() => onDelete(ad.id)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </IconButton>
        </div>
      </div>
      <div className="ad-body">
        <h3 className="ad-title">{ad.title}</h3>
        <p className="ad-meta">
          Starts: <b>Oct 01, 2023</b> • Position: <b>{ad.position}</b>
        </p>
        <div className="ad-metrics">
          <span className="perf-btn">Performance Metrics</span>
          <div className="metrics-nums">
            <div className="metric-item">
              <span className="metric-label">VIEWS</span>
              <span className="metric-val">{ad.views}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">CLICKS</span>
              <span className="metric-val">{ad.clicks}</span>
            </div>
            <div className="metric-item ctr">
              <span className="metric-label ctr-label">CTR</span>
              <span className="metric-val ctr-val">{ad.ctr}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Ads() {
  const initialAds = [
    {
      id: 1,
      title: 'Fest Banner',
      views: '124,000',
      clicks: '6,200',
      ctr: '5.0',
      status: 'Running',
      position: 'Home',
      redirectUrl: 'https://example.com',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Beauty Products',
      views: '124,000',
      clicks: '6,200',
      ctr: '5.0',
      status: 'Running',
      position: 'Home',
      redirectUrl: 'https://example.com',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Upgrade Ad',
      views: '84,500',
      clicks: '2,100',
      ctr: '2.5',
      status: 'Paused',
      position: 'Receive Whistle',
      redirectUrl: 'https://example.com',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Food Restaurant',
      views: '84,500',
      clicks: '2,100',
      ctr: '2.5',
      status: 'Paused',
      position: 'Receive Whistle',
      redirectUrl: 'https://example.com',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const [ads, setAds] = useState(initialAds)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [adName, setAdName] = useState('')
  const [adPosition, setAdPosition] = useState('Home')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [fileError, setFileError] = useState('')
  const [toast, setToast] = useState('')
  const fileInputRef = useRef(null)
  const nextId = useRef(5)

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const runningCount = ads.filter(ad => ad.status === 'Running').length

  const openModal = ad => {
    if (ad) {
      setEditingId(ad.id)
      setAdName(ad.title)
      setAdPosition(ad.position)
      setRedirectUrl(ad.redirectUrl || '')
      setImagePreview(ad.image)
      setFileError('')
    } else {
      resetModal()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    resetModal()
  }

  const resetModal = () => {
    setAdName('')
    setAdPosition('Home')
    setRedirectUrl('')
    setImagePreview('')
    setFileError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFileError('Please upload a valid image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = event => {
      setImagePreview(event.target.result)
      setFileError('')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFileError('Please upload a valid image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = event => {
      setImagePreview(event.target.result)
      setFileError('')
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePreview = () => {
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleToggleStatus = id => {
    setAds(prev => prev.map(ad =>
      ad.id === id
        ? { ...ad, status: ad.status === 'Running' ? 'Paused' : 'Running' }
        : ad
    ))
  }

  const handleDelete = id => {
    setAds(prev => prev.filter(ad => ad.id !== id))
  }

  const handleSave = () => {
    if (!adName.trim()) {
      setToast('Please enter a campaign name.')
      return
    }

    const src = imagePreview || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'

    if (editingId) {
      setAds(prev => prev.map(ad =>
        ad.id === editingId
          ? { ...ad, title: adName.trim(), position: adPosition, redirectUrl, image: src }
          : ad
      ))
      setToast(`Campaign "${adName.trim()}" updated successfully!`)
    } else {
      setAds(prev => [
        {
          id: nextId.current++,
          title: adName.trim(),
          views: '0',
          clicks: '0',
          ctr: '0.0',
          status: 'Running',
          position: adPosition,
          redirectUrl,
          image: src,
        },
        ...prev,
      ])
      setToast(`Campaign "${adName.trim()}" uploaded successfully!`)
    }

    closeModal()
  }

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) closeModal()
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Active Ads</h1>
          <p className="campaigns-count">
            Total running campaigns : <strong>{runningCount}</strong>
          </p>
        </div>
        <button className="btn-add" type="button" onClick={() => openModal(null)}>
          Add New Campaign
        </button>
      </div>

      <div className="ads-grid">
        {ads.map(ad => (
          <AdCard
            key={ad.id}
            ad={ad}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={openModal}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="overlay open" onClick={handleOverlayClick}>
          <div className="modal">
            <h2>{editingId ? 'Edit Campaign' : 'New Ad/Campaign'}</h2>
            <label className="field-label">Ad Name</label>
            <input
              className="field-input"
              type="text"
              value={adName}
              onChange={e => setAdName(e.target.value)}
              placeholder="Silly Horn Accent"
            />
            <label className="field-label" style={{ marginTop: 16 }}>
              Ad Position
            </label>
            <select
              className="field-input"
              value={adPosition}
              onChange={e => setAdPosition(e.target.value)}
            >
              <option>Home Page 1</option>
              <option>Home Page 2</option>
              <option>Receive Whistle</option>
              <option>Sidebar</option>
            </select>
            <label className="field-label" style={{ marginTop: 16 }}>
              Media File
            </label>
            <div
              className="drop-zone"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div>
                <span className="upload-icon">📤</span>
                <p className="drop-title">Upload PNG/JPEG File</p>
                <p className="drop-note">Recommended size 336 x 280 px</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="preview-wrap">
                <div className="preview-thumb">
                  <img src={imagePreview} alt="Campaign preview" className="preview-img" />
                  <button className="preview-remove-btn" type="button" onClick={handleRemovePreview}>
                    ✕
                  </button>
                </div>
              </div>
            )}
            {fileError && <p className="field-error">{fileError}</p>}
            <label className="field-label" style={{ marginTop: 16 }}>
              Redirect URL
            </label>
            <input
              className="field-input"
              type="text"
              value={redirectUrl}
              onChange={e => setRedirectUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <div className="modal-footer">
              <button className="btn-cancel" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-upload" type="button" onClick={handleSave}>
                {editingId ? 'Save' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
