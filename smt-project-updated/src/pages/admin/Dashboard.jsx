import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

export default function Dashboard() {
  const employees    = JSON.parse(localStorage.getItem('smt_employees')    || '[]')
  const applications = JSON.parse(localStorage.getItem('smt_applications') || '[]')
  const jobs         = JSON.parse(localStorage.getItem('smt_jobs')         || '[]')
  const contacts     = JSON.parse(localStorage.getItem('smt_contacts')     || '[]')

  const newApps  = applications.filter(a => a.status === 'new').length
  const activeJobs = jobs.filter(j => j.active !== false).length

  const cards = [
    { label: 'Total Employees',   value: employees.length,    icon: '👥', color: 'blue'   },
    { label: 'Open Jobs',         value: activeJobs,           icon: '📋', color: 'cyan'   },
    { label: 'New Applications',  value: newApps,              icon: '📩', color: 'amber'  },
    { label: 'Contact Enquiries', value: contacts.length,      icon: '✉️', color: 'purple' },
  ]

  const recentApps = applications.slice(-5).reverse()

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening at Soft Master Technology.</p>
      </div>

      {/* Stat cards */}
      <div className="dash-cards">
        {cards.map(c => (
          <div className={`dash-card dash-card-${c.color}`} key={c.label}>
            <div className="dash-card-icon">{c.icon}</div>
            <div className="dash-card-val">{c.value}</div>
            <div className="dash-card-lbl">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="admin-section">
        <h2>Recent Applications</h2>
        {recentApps.length === 0 ? (
          <div className="empty-state">No applications yet. Share your careers page to get applicants!</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Role</th><th>Email</th><th>Applied</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApps.map((a, i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td>{a.role}</td>
                  <td>{a.email}</td>
                  <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                  <td><span className={`status-badge status-${a.status}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Links */}
      <div className="admin-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/admin/jobs"         className="qa-card">📋 Post a New Job</Link>
          <Link to="/admin/applications" className="qa-card">📩 Review Applications</Link>
          <Link to="/admin/employees"    className="qa-card">👥 Add Employee</Link>
          <a href="/careers" target="_blank" rel="noreferrer" className="qa-card">🔗 View Careers Page</a>
        </div>
      </div>
    </div>
  )
}
