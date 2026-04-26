import React, { useState } from 'react'
import './Employee.css'

const DEFAULT = {
  name: 'Ravi Kumar', empId: 'SMT-001', role: 'Full Stack Developer',
  dept: 'Engineering', email: 'ravi@softmastertechnology.com',
  phone: '+91 98765 43210', joinDate: '2024-01-15', bloodGroup: 'O+',
  address: 'Vijayawada, Andhra Pradesh'
}

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('smt_emp_profile')
    return saved ? JSON.parse(saved) : DEFAULT
  })
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState(profile)
  const [saved, setSaved]     = useState(false)

  const handleSave = () => {
    setProfile(form)
    localStorage.setItem('smt_emp_profile', JSON.stringify(form))
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Field = ({ label, field, type = 'text' }) => (
    <div className="emp-profile-field">
      <label>{label}</label>
      {editing
        ? <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
        : <span>{profile[field]}</span>
      }
    </div>
  )

  return (
    <div className="emp-page">
      <div className="emp-page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and update your personal information</p>
        </div>
        {!editing
          ? <button className="emp-btn-primary" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          : <div style={{ display:'flex', gap:'10px' }}>
              <button className="emp-btn-primary" onClick={handleSave}>💾 Save</button>
              <button className="emp-btn-outline" onClick={() => { setForm(profile); setEditing(false) }}>Cancel</button>
            </div>
        }
      </div>
      {saved && <div className="emp-success-banner">✅ Profile updated successfully!</div>}

      <div className="emp-profile-card">
        <div className="emp-profile-avatar-section">
          <div className="emp-profile-avatar">{profile.name[0]}</div>
          <div>
            <div className="emp-profile-name">{profile.name}</div>
            <div className="emp-profile-role">{profile.role}</div>
            <div className="emp-profile-dept">{profile.dept}</div>
          </div>
        </div>
        <div className="emp-profile-grid">
          <Field label="Full Name" field="name" />
          <Field label="Employee ID" field="empId" />
          <Field label="Role / Designation" field="role" />
          <Field label="Department" field="dept" />
          <Field label="Email Address" field="email" type="email" />
          <Field label="Phone Number" field="phone" />
          <Field label="Date of Joining" field="joinDate" type="date" />
          <Field label="Blood Group" field="bloodGroup" />
          <Field label="Address" field="address" />
        </div>
      </div>
    </div>
  )
}
