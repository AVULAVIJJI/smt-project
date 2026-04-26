import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Employee.css'

export default function EmployeeLogin() {
  const [form, setForm]   = useState({ empId: '', password: '' })
  const [error, setError] = useState('')
  const navigate           = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // Demo: any empId + password "smt123" works
    if (form.empId && form.password === 'smt123') {
      localStorage.setItem('smt_employee', JSON.stringify({ empId: form.empId, name: 'Employee' }))
      navigate('/employee')
    } else {
      setError('Invalid Employee ID or password. (Demo: any ID + password "smt123")')
    }
  }

  return (
    <div className="emp-login-page">
      <div className="emp-login-card">
        <Link to="/" className="emp-back-home">← Back to Website</Link>
        <div className="emp-login-logo">
          <div className="emp-logo-mark">S</div>
          <span>SMT <em>Employee Portal</em></span>
        </div>
        <h2>Welcome Back</h2>
        <p className="emp-login-sub">Sign in to access your employee dashboard</p>
        {error && <div className="emp-error">{error}</div>}
        <form className="emp-login-form" onSubmit={handleSubmit}>
          <div className="emp-field">
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="e.g. SMT-001"
              value={form.empId}
              onChange={e => setForm({ ...form, empId: e.target.value })}
              required
            />
          </div>
          <div className="emp-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="emp-login-btn">Sign In →</button>
        </form>
        <p className="emp-hint">Demo: Use any Employee ID with password <strong>smt123</strong></p>
      </div>
    </div>
  )
}
