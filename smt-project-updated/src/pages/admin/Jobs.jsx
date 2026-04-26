import React, { useState } from 'react'
import './Admin.css'

const EMPTY = { title:'', dept:'', location:'', type:'Full-Time', exp:'', desc:'', active: true }

export default function Jobs() {
  const [jobs,    setJobs]    = useState(() => JSON.parse(localStorage.getItem('smt_jobs') || '[]'))
  const [form,    setForm]    = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [showForm, setShow]   = useState(false)

  const save = () => {
    let updated
    if (editing !== null) {
      updated = jobs.map((j, i) => i === editing ? { ...form } : j)
      setEditing(null)
    } else {
      updated = [...jobs, { ...form, id: Date.now(), postedAt: new Date().toISOString() }]
    }
    setJobs(updated)
    localStorage.setItem('smt_jobs', JSON.stringify(updated))
    setForm(EMPTY)
    setShow(false)
  }

  const del = i => {
    const updated = jobs.filter((_, idx) => idx !== i)
    setJobs(updated)
    localStorage.setItem('smt_jobs', JSON.stringify(updated))
  }

  const edit = i => {
    setForm({ ...jobs[i] })
    setEditing(i)
    setShow(true)
  }

  const toggle = i => {
    const updated = jobs.map((j, idx) => idx === i ? { ...j, active: !j.active } : j)
    setJobs(updated)
    localStorage.setItem('smt_jobs', JSON.stringify(updated))
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Job Listings</h1>
          <p>Post and manage open positions shown on your Careers page.</p>
        </div>
        <button className="btn-admin-primary" onClick={() => { setForm(EMPTY); setEditing(null); setShow(true) }}>
          + Post New Job
        </button>
      </div>

      {showForm && (
        <div className="admin-form-box">
          <h3>{editing !== null ? 'Edit Job' : 'Post New Job'}</h3>
          <div className="af-grid">
            <div className="lf-group">
              <label>Job Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. React Developer" />
            </div>
            <div className="lf-group">
              <label>Department</label>
              <input value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} placeholder="e.g. Engineering" />
            </div>
            <div className="lf-group">
              <label>Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote / Vijayawada" />
            </div>
            <div className="lf-group">
              <label>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="lf-group">
              <label>Experience Required</label>
              <input value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })} placeholder="e.g. 2–4 years" />
            </div>
          </div>
          <div className="lf-group">
            <label>Job Description *</label>
            <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Describe the role, responsibilities, and requirements..." rows={4} />
          </div>
          <div className="form-actions">
            <button className="btn-admin-primary" onClick={save}>
              {editing !== null ? 'Save Changes' : 'Post Job'}
            </button>
            <button className="btn-admin-ghost" onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-section">
        {jobs.length === 0 ? (
          <div className="empty-state">No jobs posted yet. Click "Post New Job" to add one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Dept</th><th>Type</th><th>Location</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {jobs.map((j, i) => (
                <tr key={i}>
                  <td><strong>{j.title}</strong></td>
                  <td>{j.dept}</td>
                  <td>{j.type}</td>
                  <td>{j.location}</td>
                  <td>
                    <span className={`status-badge ${j.active !== false ? 'status-active' : 'status-closed'}`}>
                      {j.active !== false ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button className="tbl-btn" onClick={() => edit(i)}>Edit</button>
                    <button className="tbl-btn" onClick={() => toggle(i)}>{j.active !== false ? 'Close' : 'Reopen'}</button>
                    <button className="tbl-btn danger" onClick={() => del(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
