import React, { useState } from 'react'
import './Employee.css'

const LEAVE_TYPES = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Work From Home']

const INIT_LEAVES = [
  { id:1, type:'Annual Leave',  from:'2026-02-10', to:'2026-02-12', days:3, reason:'Family function',  status:'Approved' },
  { id:2, type:'Sick Leave',    from:'2026-01-22', to:'2026-01-22', days:1, reason:'Fever',            status:'Approved' },
  { id:3, type:'Casual Leave',  from:'2026-03-05', to:'2026-03-05', days:1, reason:'Personal work',   status:'Pending'  },
]

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState(INIT_LEAVES)
  const [showForm, setShow] = useState(false)
  const [form, setForm]     = useState({ type: LEAVE_TYPES[0], from:'', to:'', reason:'' })
  const [success, setSuc]   = useState(false)

  const submit = e => {
    e.preventDefault()
    if (!form.from || !form.to || !form.reason) return
    const from = new Date(form.from), to = new Date(form.to)
    const days = Math.max(1, Math.round((to - from) / 86400000) + 1)
    setLeaves(prev => [...prev, { id: Date.now(), ...form, days, status: 'Pending' }])
    setForm({ type: LEAVE_TYPES[0], from:'', to:'', reason:'' })
    setShow(false)
    setSuc(true)
    setTimeout(() => setSuc(false), 3000)
  }

  const BALANCE = { 'Annual Leave': 12, 'Sick Leave': 6, 'Casual Leave': 6 }
  const used = tp => leaves.filter(l => l.type === tp && l.status === 'Approved').reduce((a, l) => a + l.days, 0)

  return (
    <div className="emp-page">
      <div className="emp-page-header">
        <div><h1>Leave Tracker</h1><p>Manage and apply for your leaves</p></div>
        <button className="emp-btn-primary" onClick={() => setShow(true)}>+ Apply for Leave</button>
      </div>

      {success && <div className="emp-success-banner">✅ Leave application submitted successfully!</div>}

      {/* Balance cards */}
      <div className="emp-stats-row">
        {Object.entries(BALANCE).map(([type, total]) => (
          <div className="emp-stat-card" key={type}>
            <div className="emp-stat-value">{total - used(type)}</div>
            <div className="emp-stat-label">{type}</div>
            <div className="emp-stat-sub">{used(type)} used of {total}</div>
          </div>
        ))}
      </div>

      {/* History table */}
      <div className="emp-section">
        <h2>Leave History</h2>
        <div className="emp-table-wrap">
          <table className="emp-table">
            <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th></tr></thead>
            <tbody>
              {leaves.map(l => (
                <tr key={l.id}>
                  <td>{l.type}</td>
                  <td>{l.from}</td>
                  <td>{l.to}</td>
                  <td>{l.days}</td>
                  <td>{l.reason}</td>
                  <td>
                    <span className={`emp-badge ${l.status==='Approved'?'badge-green':l.status==='Pending'?'badge-yellow':'badge-red'}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply modal */}
      {showForm && (
        <div className="emp-modal-overlay" onClick={() => setShow(false)}>
          <div className="emp-modal-box" onClick={e => e.stopPropagation()}>
            <div className="emp-modal-head">
              <h3>Apply for Leave</h3>
              <button className="emp-modal-x" onClick={() => setShow(false)}>✕</button>
            </div>
            <form className="emp-form" onSubmit={submit}>
              <div className="emp-field">
                <label>Leave Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  {LEAVE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="emp-form-row">
                <div className="emp-field">
                  <label>From Date</label>
                  <input type="date" value={form.from} onChange={e => setForm({...form, from: e.target.value})} required />
                </div>
                <div className="emp-field">
                  <label>To Date</label>
                  <input type="date" value={form.to} onChange={e => setForm({...form, to: e.target.value})} required />
                </div>
              </div>
              <div className="emp-field">
                <label>Reason</label>
                <textarea rows="3" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="Brief reason for leave..." required />
              </div>
              <button type="submit" className="emp-btn-primary" style={{width:'100%'}}>Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
