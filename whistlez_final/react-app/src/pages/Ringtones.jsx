import React, { useEffect, useRef, useState } from 'react'

const initialRingtones = [
  { id: 1, name: 'Bell Classic', dur: '0:15', active: true, isDefault: true },
  { id: 2, name: 'Synth Wave Ring', dur: '0:28', active: false, isDefault: false },
  { id: 3, name: 'Chiptune Laugh', dur: '0:08', active: false, isDefault: false },
  { id: 4, name: 'Corporate Ring', dur: '0:30', active: false, isDefault: false },
]

function parseDurToSeconds(dur) {
  const clean = dur.replace(/sec|s/gi, '').trim()
  if (clean.includes(':')) {
    const [m, s] = clean.split(':').map(Number)
    return (m * 60) + (s || 0)
  }
  return parseFloat(clean) || 30
}

function formatSeconds(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const IconMusic = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#7c3aed" stroke="none">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const IconPause = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round">
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="18" y1="4" x2="18" y2="20" />
  </svg>
)

const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function Ringtones() {
  const [ringtones, setRingtones] = useState(initialRingtones)
  const [playingId, setPlayingId] = useState(null)
  const [playSeconds, setPlaySeconds] = useState(0)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState(null)
  const [pendingName, setPendingName] = useState('')
  const [pendingDur, setPendingDur] = useState('0:08')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDur, setEditDur] = useState('')
  const fileInputRef = useRef(null)
  const nextIdRef = useRef(5)

  useEffect(() => {
    if (playingId === null) {
      setPlaySeconds(0)
      return
    }

    const current = ringtones.find(r => r.id === playingId)
    if (!current) {
      setPlayingId(null)
      return
    }

    const total = parseDurToSeconds(current.dur)
    const timer = setInterval(() => {
      setPlaySeconds(prev => {
        const next = prev + 0.5
        if (next >= total) {
          clearInterval(timer)
          setPlayingId(null)
          return 0
        }
        return next
      })
    }, 500)

    return () => clearInterval(timer)
  }, [playingId, ringtones])

  const togglePlay = id => {
    if (playingId === id) {
      setPlayingId(null)
      setPlaySeconds(0)
      return
    }
    setPlayingId(id)
    setPlaySeconds(0)
  }

  const toggleActive = (id, active) => {
    setRingtones(prev => prev.map(r => r.id === id ? { ...r, active } : r))
  }

  const handleSeek = (e, id) => {
    e.stopPropagation()
    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const ringtone = ringtones.find(r => r.id === id)
    if (!ringtone) return
    setPlaySeconds(pct * parseDurToSeconds(ringtone.dur))
  }

  const openUploadModal = () => {
    setIsUploadOpen(true)
    setPendingFile(null)
    setPendingName('')
    setPendingDur('0:08')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const closeUploadModal = () => {
    setIsUploadOpen(false)
    setPendingFile(null)
    setPendingName('')
    setPendingDur('0:08')
  }

  const handleFileChange = event => {
    const file = event.target.files?.[0]
    if (!file) return
    const name = file.name.replace(/\.[^/.]+$/, '')
    setPendingFile(file)
    setPendingName(name)
    setPendingDur('0:08')
  }

  const removeFile = () => {
    setPendingFile(null)
    setPendingName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadRingtone = () => {
    if (!pendingFile || !pendingName.trim()) return
    setRingtones(prev => [
      ...prev,
      {
        id: nextIdRef.current++,
        name: pendingName.trim(),
        dur: pendingDur,
        active: false,
        isDefault: false,
      },
    ])
    closeUploadModal()
  }

  const openEditModal = id => {
    const ringtone = ringtones.find(r => r.id === id)
    if (!ringtone) return
    setEditId(id)
    setEditName(ringtone.name)
    setEditDur(ringtone.dur)
    setIsEditOpen(true)
  }

  const closeEditModal = () => {
    setIsEditOpen(false)
    setEditId(null)
    setEditName('')
    setEditDur('')
  }

  const saveEdit = () => {
    if (!editId) return
    setRingtones(prev => prev.map(r => r.id === editId ? {
      ...r,
      name: editName.trim() || r.name,
      dur: editDur.trim() || r.dur,
    } : r))
    closeEditModal()
  }

  const deleteRingtone = id => {
    if (playingId === id) {
      setPlayingId(null)
      setPlaySeconds(0)
    }
    setRingtones(prev => prev.filter(r => r.id !== id))
  }

  const uploadReady = Boolean(pendingFile && pendingName.trim())

  return (
    <div className="app">
      <div className="header">
        <h1>Whistlez Ringtone</h1>
        <button className="btn-add" type="button" onClick={openUploadModal}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Ringtone
        </button>
      </div>

      <div className="grid">
        {ringtones.map(ringtone => {
          const isPlaying = playingId === ringtone.id
          const totalSeconds = parseDurToSeconds(ringtone.dur)
          const percent = isPlaying ? Math.min((playSeconds / totalSeconds) * 100, 100) : 0
          return (
            <div className="card" key={ringtone.id}>
              <div className="card-top">
                <div className="card-left">
                  <div className="icon-wrap"><IconMusic /></div>
                  <div className="card-meta">
                    <div className="card-name-row">
                      <span className="card-name">{ringtone.name}</span>
                      {ringtone.isDefault && <span className="badge-default">Default</span>}
                    </div>
                    <div className="card-dur">{ringtone.dur} sec</div>
                  </div>
                </div>
                <div className="card-right">
                  <span className="status-label">{ringtone.active ? 'Active' : 'Disabled'}</span>
                  <label className="toggle" title="Toggle active/disabled">
                    <input
                      type="checkbox"
                      checked={ringtone.active}
                      onChange={e => toggleActive(ringtone.id, e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>

              <div className="card-bottom">
                <button className="btn-play" type="button" onClick={() => togglePlay(ringtone.id)}>
                  {isPlaying ? <IconPause /> : <IconPlay />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <div className="action-icons">
                  <button className="btn-icon" type="button" title="Edit" onClick={() => openEditModal(ringtone.id)}>
                    <IconEdit />
                  </button>
                  <button className="btn-icon del" type="button" title="Delete" onClick={() => deleteRingtone(ringtone.id)}>
                    <IconTrash />
                  </button>
                </div>
              </div>

              {isPlaying && (
                <div className="progress-row">
                  <span className="t-lbl">{formatSeconds(playSeconds)}</span>
                  <div className="prog-track" onClick={e => handleSeek(e, ringtone.id)}>
                    <div className="prog-fill" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="t-lbl r">{ringtone.dur} sec</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className={`overlay${isUploadOpen ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && closeUploadModal()}>
        <div className="modal">
          <h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            Upload Ringtone
          </h2>
          <label className="field-label">Ringtone Name</label>
          <input
            className="field-input"
            type="text"
            value={pendingName}
            onChange={e => setPendingName(e.target.value)}
            placeholder="e.g. Silly Horn Accent"
          />
          <label className="field-label" style={{ marginTop: 14 }}>Audio File</label>
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <p className="uz-text">Upload Audio File</p>
            <p className="uz-sub">Length of file should be below 30 sec</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="audio/*"
            onChange={handleFileChange}
          />
          {pendingFile && (
            <>
              <div className="fp-row">
                <div className="fp-icon">
                  <IconPlay />
                </div>
                <div className="fp-info">
                  <div className="fp-name">{pendingName}</div>
                  <div className="fp-dur">{pendingDur} sec</div>
                </div>
                <button className="btn-rm" type="button" onClick={removeFile} title="Remove">
                  <IconClose />
                </button>
              </div>
              <div className="fp-row" style={{ alignItems: 'flex-start' }}>
                <div className="fp-icon solid">
                  <IconPause />
                </div>
                <div className="fp-info">
                  <div className="fp-name">{pendingName}</div>
                  <div className="fp-mini">
                    <span className="mini-t">0:04</span>
                    <div className="mini-bar"><div className="mini-fill" /></div>
                    <span className="mini-t">{pendingDur} sec</span>
                  </div>
                </div>
                <button className="btn-rm" type="button" onClick={removeFile} title="Remove">
                  <IconClose />
                </button>
              </div>
            </>
          )}
          <div className="modal-footer">
            <button className="btn-cancel" type="button" onClick={closeUploadModal}>Cancel</button>
            <button className="btn-upload" type="button" onClick={uploadRingtone} disabled={!uploadReady}>Upload</button>
          </div>
        </div>
      </div>

      <div className={`overlay${isEditOpen ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && closeEditModal()}>
        <div className="modal">
          <h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Ringtone
          </h2>
          <label className="field-label">Ringtone Name</label>
          <input
            className="field-input"
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            placeholder="Name"
          />
          <label className="field-label" style={{ marginTop: 14 }}>Duration (e.g. 0:15)</label>
          <input
            className="field-input"
            type="text"
            value={editDur}
            onChange={e => setEditDur(e.target.value)}
            placeholder="0:15"
          />
          <div className="modal-footer">
            <button className="btn-cancel" type="button" onClick={closeEditModal}>Cancel</button>
            <button className="btn-upload" type="button" onClick={saveEdit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
