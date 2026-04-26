import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom'
import './Employee.css'

const NAV = [
  { to: '/employee', label: 'Dashboard', icon: '⊞', end: true, direct: true },
  {
    label: 'Favourites', icon: '⭐',
    children: [
      { to: '/employee/favourites/acceptable-use-policy', label: 'Acceptable Use Policy' },
      { to: '/employee/favourites/business-continuity',   label: 'Business Continuity Mgmt System' },
      { to: '/employee/favourites/cyber-shield',          label: 'Cyber Shield' },
      { to: '/employee/favourites/data-privacy',          label: 'Data Privacy Framework' },
      { to: '/employee/favourites/data-retention',        label: 'Data Retention Policy' },
      { to: '/employee/favourites/incident-escalation',   label: 'Incident Escalation Framework' },
    ]
  },
  {
    label: 'My Data', icon: '🗂️',
    children: [
      { to: '/employee/my-data/profile',    label: 'My Profile' },
      { to: '/employee/my-data/payslips',   label: 'Pay Slips' },
      { to: '/employee/my-data/documents',  label: 'My Documents' },
      { to: '/employee/my-data/attendance', label: 'Attendance' },
    ]
  },
  {
    label: 'My Development', icon: '📊',
    children: [
      { to: '/employee/my-development/goals',       label: 'My Goals' },
      { to: '/employee/my-development/training',    label: 'Training & Courses' },
      { to: '/employee/my-development/performance', label: 'Performance Review' },
      { to: '/employee/my-development/feedback',    label: 'Feedback' },
    ]
  },
  {
    label: 'HR', icon: '👤',
    children: [
      { to: '/employee/hr/leaves',     label: 'Leave Tracker' },
      { to: '/employee/hr/policies',   label: 'HR Policies' },
      { to: '/employee/hr/onboarding', label: 'Onboarding' },
      { to: '/employee/hr/exit',       label: 'Exit Formalities' },
      { to: '/employee/hr/grievance',  label: 'Grievance' },
    ]
  },
  {
    label: 'Quality', icon: '📋',
    children: [
      { to: '/employee/quality/iso',       label: 'ISO Standards' },
      { to: '/employee/quality/audits',    label: 'Audits' },
      { to: '/employee/quality/ncr',       label: 'NCR Tracker' },
      { to: '/employee/quality/documents', label: 'Quality Documents' },
    ]
  },
  {
    label: 'Revenue Assurance', icon: '🎯',
    children: [
      { to: '/employee/revenue-assurance/reports',  label: 'RA Reports' },
      { to: '/employee/revenue-assurance/controls', label: 'Controls' },
      { to: '/employee/revenue-assurance/leakage',  label: 'Leakage Tracker' },
    ]
  },
  {
    label: 'MIS', icon: '🖥️',
    children: [
      { to: '/employee/mis/dashboard', label: 'MIS Dashboard' },
      { to: '/employee/mis/reports',   label: 'Reports' },
      { to: '/employee/mis/analytics', label: 'Analytics' },
    ]
  },
  {
    label: 'Finance', icon: '💲',
    children: [
      { to: '/employee/finance/payslips',      label: 'Pay Slips' },
      { to: '/employee/finance/reimbursement', label: 'Reimbursement' },
      { to: '/employee/finance/tax',           label: 'Tax Declaration' },
      { to: '/employee/finance/advances',      label: 'Advances' },
    ]
  },
  {
    label: 'Admin-Facilities', icon: '🏢',
    children: [
      { to: '/employee/admin-facilities/assets',    label: 'Asset Management' },
      { to: '/employee/admin-facilities/travel',    label: 'Travel Desk' },
      { to: '/employee/admin-facilities/cab',       label: 'Cab Booking' },
      { to: '/employee/admin-facilities/cafeteria', label: 'Cafeteria' },
      { to: '/employee/admin-facilities/helpdesk',  label: 'Helpdesk' },
    ]
  },
  {
    label: 'CMO', icon: '🎨',
    children: [
      { to: '/employee/cmo/brand',     label: 'Brand Assets' },
      { to: '/employee/cmo/campaigns', label: 'Campaigns' },
      { to: '/employee/cmo/events',    label: 'Events' },
    ]
  },
  {
    label: 'IT', icon: '⚙️',
    children: [
      { to: '/employee/it/helpdesk', label: 'IT Helpdesk' },
      { to: '/employee/it/assets',   label: 'IT Assets' },
      { to: '/employee/it/software', label: 'Software Requests' },
      { to: '/employee/it/access',   label: 'Access Management' },
    ]
  },
  {
    label: 'Procurement', icon: '🔄',
    children: [
      { to: '/employee/procurement/purchase',  label: 'Purchase Requests' },
      { to: '/employee/procurement/vendors',   label: 'Vendor Management' },
      { to: '/employee/procurement/contracts', label: 'Contracts' },
    ]
  },
  {
    label: 'Privacy & IS', icon: '🔒',
    children: [
      { to: '/employee/privacy-is/policies',  label: 'IS Policies' },
      { to: '/employee/privacy-is/gdpr',      label: 'GDPR Compliance' },
      { to: '/employee/privacy-is/incidents', label: 'Incident Reporting' },
      { to: '/employee/privacy-is/training',  label: 'Security Training' },
    ]
  },
  {
    label: 'Misc', icon: '🌐',
    children: [
      { to: '/employee/misc/links',         label: 'Useful Links' },
      { to: '/employee/misc/announcements', label: 'Announcements' },
      { to: '/employee/misc/directory',     label: 'Employee Directory' },
    ]
  },
]

export default function EmployeeLayout() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [openSections, setOpenSections] = useState({})
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('smt_employee')) navigate('/employee/login')
  }, [])

  // Auto-open section for current path
  useEffect(() => {
    NAV.forEach((n, i) => {
      if (n.children && n.children.some(c => location.pathname.startsWith(c.to))) {
        setOpenSections(prev => ({ ...prev, [i]: true }))
      }
    })
  }, [location.pathname])

  const logout = () => {
    localStorage.removeItem('smt_employee')
    navigate('/employee/login')
  }

  const emp = JSON.parse(localStorage.getItem('smt_employee') || '{}')
  const toggle = (i) => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="emp-shell">
      {sidebarOpen && <div className="emp-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`emp-sidebar ${sidebarOpen ? 'emp-sidebar-open' : ''}`}>
        <div className="emp-sidebar-logo">
          <div className="emp-logo-mark">S</div>
          <span>SMT <em>Portal</em></span>
        </div>
        <div className="emp-sidebar-user">
          <div className="emp-avatar">{(emp.empId || 'E')[0].toUpperCase()}</div>
          <div>
            <div className="emp-user-name">{emp.name || 'Employee'}</div>
            <div className="emp-user-id">{emp.empId || ''}</div>
          </div>
        </div>

        <nav className="emp-sidebar-nav">
          {NAV.map((n, i) => {
            if (n.direct) {
              return (
                <NavLink key={n.to} to={n.to} end
                  className={({ isActive }) => `emp-sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="emp-sidebar-icon">{n.icon}</span>
                  {n.label}
                </NavLink>
              )
            }
            const isOpen = openSections[i]
            const anyActive = n.children.some(c => location.pathname.startsWith(c.to))
            return (
              <div key={i} className="emp-nav-section">
                <button
                  className={`emp-sidebar-link emp-sidebar-toggle ${anyActive ? 'active' : ''}`}
                  onClick={() => toggle(i)}
                >
                  <span className="emp-sidebar-icon">{n.icon}</span>
                  <span className="emp-toggle-label">{n.label}</span>
                  <span className={`emp-toggle-arrow ${isOpen ? 'open' : ''}`}>›</span>
                </button>
                {isOpen && (
                  <div className="emp-sub-links">
                    {n.children.map(c => (
                      <NavLink key={c.to} to={c.to}
                        className={({ isActive }) => `emp-sub-link ${isActive ? 'active' : ''}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="emp-sub-star">★</span>
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="emp-sidebar-bottom">
          <Link to="/" className="emp-sidebar-link">🌐 View Website ↗</Link>
          <button className="emp-btn-logout" onClick={logout}>Log Out</button>
        </div>
      </aside>

      <main className="emp-main">
        <div className="emp-mobile-topbar">
          <button className="emp-hamburger" onClick={() => setSidebarOpen(o => !o)}>
            <span/><span/><span/>
          </button>
          <div className="emp-mobile-logo">SMT Portal</div>
          <div className="emp-avatar emp-avatar-sm">{(emp.empId || 'E')[0].toUpperCase()}</div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
