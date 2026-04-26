import React, { useState } from 'react'
import './Admin.css'

const EMPTY_EMP = { name:'', role:'', dept:'', email:'', phone:'', joinDate:'', salary:'', status:'Active' }

export default function Employees() {
  const [emps,     setEmps]    = useState(() => JSON.parse(localStorage.getItem('smt_employees') || '[]'))
  const [form,     setForm]    = useState(EMPTY_EMP)
  const [editing,  setEditing] = useState(null)
  const [showForm, setShow]    = useState(false)
  const [search,   setSearch]  = useState('')

  const save = () => {
    let updated
    if (editing !== null) {
      updated = emps.map((e, i) => i === editing ? { ...form } : e)
      setEditing(null)
    } else {
      updated = [...emps, { ...form, id: Date.now(), addedAt: new Date().toISOString() }]
    }
    setEmps(updated)
    localStorage.setItem('smt_employees', JSON.stringify(updated))
    setForm(EMPTY_EMP)
    setShow(false)
  }

  const del = i => {
    const updated = emps.filter((_, idx) => idx !== i)
    setEmps(updated)
    localStorage.setItem('smt_employees', JSON.stringify(updated))
  }

  const edit = i => {
    setForm({ ...emps[i] })
    setEditing(i)
    setShow(true)
  }

  const filtered = emps.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.role?.toLowerCase().includes(search.toLowerCase()) ||
    e.dept?.toLowerCase().includes(search.toLowerCase())
  )

  const initials = name => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Employees</h1>
          <p>Manage your team — add, edit, and view all employee records.</p>
        </div>
        <button className="btn-admin-primary" onClick={() => { setForm(EMPTY_EMP); setEditing(null); setShow(true) }}>
          + Add Employee
        </button>
      </div>

      {showForm && (
        <div className="admin-form-box">
          <h3>{editing !== null ? 'Edit Employee' : 'Add New Employee'}</h3>
          <div className="af-grid">
            <div className="lf-group">
              <label>Full Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
            </div>
            <div className="lf-group">
              <label>Job Role *</label>
              <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. React Developer" />
            </div>
            <div className="lf-group">
              <label>Department</label>
              <input value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} placeholder="e.g. Engineering" />
            </div>
            <div className="lf-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@softmaster.com" />
            </div>
            <div className="lf-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
            </div>
            <div className="lf-group">
              <label>Join Date</label>
              <input type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} />
            </div>
            <div className="lf-group">
              <label>Salary (₹/month)</label>
              <input value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} placeholder="e.g. 45000" />
            </div>
            <div className="lf-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option>Active</option>
                <option>On Leave</option>
                <option>Resigned</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-admin-primary" onClick={save}>{editing !== null ? 'Save Changes' : 'Add Employee'}</button>
            <button className="btn-admin-ghost" onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-section">
        <input
          className="admin-search" placeholder="Search employees..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        {filtered.length === 0 ? (
          <div className="empty-state">No employees added yet. Click "Add Employee" to get started.</div>
        ) : (
          <div className="emp-grid">
            {filtered.map((emp, i) => (
              <div className="emp-card" key={i}>
                <div className="emp-avatar">{initials(emp.name)}</div>
                <div className="emp-info">
                  <strong>{emp.name}</strong>
                  <p>{emp.role}</p>
                  <span className="emp-dept">{emp.dept}</span>
                </div>
                <div className="emp-meta">
                  {emp.email && <p>✉ {emp.email}</p>}
                  {emp.phone && <p>📞 {emp.phone}</p>}
                  {emp.joinDate && <p>📅 Joined {emp.joinDate}</p>}
                  {emp.salary && <p>💰 ₹{emp.salary}/mo</p>}
                </div>
                <div className="emp-footer">
                  <span className={`status-badge status-${emp.status === 'Active' ? 'active' : emp.status === 'On Leave' ? 'reviewing' : 'rejected'}`}>
                    {emp.status}
                  </span>
                  <div className="table-actions">
                    <button className="tbl-btn" onClick={() => edit(i)}>Edit</button>
                    <button className="tbl-btn danger" onClick={() => del(i)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
