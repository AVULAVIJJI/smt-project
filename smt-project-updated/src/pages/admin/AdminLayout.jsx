import React, { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Admin.css'

const NAV = [
  { to: '/admin',              label: 'Dashboard',    icon: '⊞' },
  { to: '/admin/jobs',         label: 'Job Listings', icon: '📋' },
  { to: '/admin/applications', label: 'Applications', icon: '📩' },
  { to: '/admin/employees',    label: 'Employees',    icon: '👥' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('smt_admin')) navigate('/admin/login')
  }, [])

  const logout = () => {
    localStorage.removeItem('smt_admin')
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">S</div>
          <span>SMT <em>Admin</em></span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/admin'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <a href="/" className="sidebar-link" rel="noreferrer">View Website ↗</a>
          <button className="btn-logout" onClick={logout}>Log Out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
