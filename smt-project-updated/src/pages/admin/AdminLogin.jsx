import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

export default function AdminLogin() {
  const [form, setForm]   = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // Simple hardcoded auth — replace with API call when backend ready
    if (form.username === 'admin' && form.password === 'smt@2025') {
      localStorage.setItem('smt_admin', 'true')
      navigate('/admin')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <div className="login-logo-mark">S</div>
          <span>Soft Master <em>Technology</em></span>
        </div>
        <h2>Admin Login</h2>
        <p>Sign in to access the admin panel</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="lf-group">
            <label>Username</label>
            <input
              type="text" placeholder="admin"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="lf-group">
            <label>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="btn-login">Sign In →</button>
        </form>
        <p className="login-hint">Default: admin / smt@2025</p>
      </div>
    </div>
  )
}
