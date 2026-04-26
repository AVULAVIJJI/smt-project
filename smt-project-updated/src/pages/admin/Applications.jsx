import React, { useState } from 'react'
import './Admin.css'

const STATUS_OPTIONS = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired']

export default function Applications() {
  const [apps, setApps]       = useState(() => JSON.parse(localStorage.getItem('smt_applications') || '[]'))
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [selected, setSelect] = useState(null)

  const updateStatus = (i, status) => {
    const updated = apps.map((a, idx) => idx === i ? { ...a, status } : a)
    setApps(updated)
    localStorage.setItem('smt_applications', JSON.stringify(updated))
    if (selected === i) setSelect(null)
  }

  const deleteApp = i => {
    const updated = apps.filter((_, idx) => idx !== i)
    setApps(updated)
    localStorage.setItem('smt_applications', JSON.stringify(updated))
    setSelect(null)
  }

  const filtered = apps.filter(a => {
    const matchFilter = filter === 'all' || a.status === filter
    const matchSearch = a.name?.toLowerCase().includes(search.toLowerCase()) ||
                        a.role?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Applications</h1>
          <p>Review and manage all job applications submitted via the careers page.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="app-filters">
        <input
          className="admin-search" placeholder="Search by name or role..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-group">
          {['all', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-section">
        {filtered.length === 0 ? (
          <div className="empty-state">No applications found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Email</th><th>Phone</th><th>Applied</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i} className={selected === i ? 'row-selected' : ''}>
                  <td><strong>{a.name}</strong></td>
                  <td>{a.role}</td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <select
                      className="status-select"
                      value={a.status}
                      onChange={e => updateStatus(i, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="table-actions">
                    <button className="tbl-btn" onClick={() => setSelect(selected === i ? null : i)}>View</button>
                    <button className="tbl-btn danger" onClick={() => deleteApp(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail panel */}
      {selected !== null && apps[selected] && (
        <div className="detail-panel">
          <div className="detail-head">
            <h3>{apps[selected].name}</h3>
            <button className="modal-x" onClick={() => setSelect(null)}>✕</button>
          </div>
          <div className="detail-grid">
            <div><span>Role</span><strong>{apps[selected].role}</strong></div>
            <div><span>Email</span><strong>{apps[selected].email}</strong></div>
            <div><span>Phone</span><strong>{apps[selected].phone}</strong></div>
            <div><span>Experience</span><strong>{apps[selected].experience || '—'}</strong></div>
            {apps[selected].portfolio && (
              <div><span>Portfolio</span><a href={apps[selected].portfolio} target="_blank" rel="noreferrer">{apps[selected].portfolio}</a></div>
            )}
          </div>
          {apps[selected].message && (
            <div className="detail-message">
              <span>Message</span>
              <p>{apps[selected].message}</p>
            </div>
          )}
          <div className="detail-actions">
            <button className="btn-admin-primary" onClick={() => updateStatus(selected, 'shortlisted')}>Shortlist</button>
            <button className="btn-hired" onClick={() => updateStatus(selected, 'hired')}>Mark Hired</button>
            <button className="btn-reject" onClick={() => updateStatus(selected, 'rejected')}>Reject</button>
          </div>
        </div>
      )}
    </div>
  )
}
