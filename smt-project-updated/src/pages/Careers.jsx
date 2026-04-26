import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Careers.css'

const STATIC_JOBS = [
  { id:1, title:'Full Stack Developer',     dept:'Engineering',  location:'Vijayawada / Remote', type:'Full-Time',  exp:'2–4 years',  desc:'Build scalable web apps using React, Node.js, and MongoDB. Work on real client projects from day one.' },
  { id:2, title:'Flutter Developer',        dept:'Mobile',       location:'Vijayawada / Remote', type:'Full-Time',  exp:'1–3 years',  desc:'Develop cross-platform mobile apps for iOS and Android with beautiful UI and native performance.' },
  { id:3, title:'Python / FastAPI Backend', dept:'Engineering',  location:'Remote',              type:'Full-Time',  exp:'2–5 years',  desc:'Design and build REST APIs, integrate AI models, and manage cloud deployments on AWS/GCP.' },
  { id:4, title:'UI/UX Designer',           dept:'Design',       location:'Vijayawada',          type:'Full-Time',  exp:'1–3 years',  desc:'Create stunning user interfaces and experiences for web and mobile products used by thousands.' },
  { id:5, title:'DevOps Engineer',          dept:'Cloud',        location:'Remote',              type:'Full-Time',  exp:'3–5 years',  desc:'Manage CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure across AWS and Azure.' },
  { id:6, title:'AI/ML Engineer',           dept:'AI',           location:'Remote',              type:'Full-Time',  exp:'2–4 years',  desc:'Build and deploy machine learning models, LLM integrations, and AI-powered automation systems.' },
  { id:7, title:'React.js Intern',          dept:'Engineering',  location:'Vijayawada',          type:'Internship', exp:'Fresher',    desc:'Learn and grow by building real projects. Strong fundamentals in HTML, CSS, JS required.' },
  { id:8, title:'Business Development Exec',dept:'Sales',        location:'Vijayawada',          type:'Full-Time',  exp:'1–2 years',  desc:'Generate leads, manage client relationships, and grow our portfolio of domestic and global clients.' },
]

const DEPTS = ['All', 'Engineering', 'Mobile', 'Design', 'Cloud', 'AI', 'Sales']
const TYPES = ['All', 'Full-Time', 'Internship']

// Merges static jobs with admin-posted jobs from localStorage
function useJobs() {
  const [jobs, setJobs] = useState(() => {
    const adminJobs = JSON.parse(localStorage.getItem('smt_jobs') || '[]')
      .filter(j => j.active !== false)
    return [...STATIC_JOBS, ...adminJobs]
  })
  return jobs
}

function ApplyModal({ job, onClose }) {
  const [form, setForm]       = useState({ name:'', email:'', phone:'', role: job.title, experience:'', portfolio:'', message:'' })
  const [submitted, setSubmit] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    // Save to localStorage (replace with API call when backend is ready)
    const apps = JSON.parse(localStorage.getItem('smt_applications') || '[]')
    apps.push({ ...form, jobId: job.id, appliedAt: new Date().toISOString(), status: 'new' })
    localStorage.setItem('smt_applications', JSON.stringify(apps))
    setSubmit(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Application Submitted!</h3>
            <p>Thanks <strong>{form.name}</strong>! We'll review your application for <strong>{job.title}</strong> and get back to you within 3–5 business days.</p>
            <button className="btn-close-modal" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <div>
                <h3>Apply for {job.title}</h3>
                <p>{job.dept} · {job.type} · {job.location}</p>
              </div>
              <button className="modal-x" onClick={onClose}>✕</button>
            </div>
            <form className="apply-form" onSubmit={handleSubmit}>
              <div className="af-row">
                <div className="af-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="af-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@gmail.com" required />
                </div>
              </div>
              <div className="af-row">
                <div className="af-group">
                  <label>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                </div>
                <div className="af-group">
                  <label>Years of Experience</label>
                  <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 2 years" />
                </div>
              </div>
              <div className="af-group">
                <label>Portfolio / GitHub / LinkedIn URL</label>
                <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://github.com/yourname" />
              </div>
              <div className="af-group">
                <label>Why do you want to join SMT?</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about yourself and why you're a great fit..." />
              </div>
              <button type="submit" className="btn-apply-submit">Submit Application →</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function Careers() {
  const [dept,       setDept]    = useState('All')
  const [type,       setType]    = useState('All')
  const [search,     setSearch]  = useState('')
  const [activeJob,  setActive]  = useState(null)

  const JOBS = useJobs()
  const filtered = JOBS.filter(j => {
    const matchDept   = dept === 'All' || j.dept === dept
    const matchType   = type === 'All' || j.type === type
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase())
    return matchDept && matchType && matchSearch
  })

  return (
    <>
      <Navbar />
      <div className="careers-page">

        {/* Hero */}
        <div className="careers-hero">
          <div className="careers-hero-inner">
            <Link to="/" className="careers-back-btn">← Back to Home</Link>
            <span className="careers-badge">We're Hiring</span>
            <h1>Build the Future<br /><em>With Us</em></h1>
            <p>Join Soft Master Technology and work on real-world projects that impact thousands of users. We value talent, creativity, and ambition — from freshers to senior engineers.</p>
            <div className="careers-stats">
              <div><strong>8</strong><span>Open Roles</span></div>
              <div><strong>40+</strong><span>Team Members</span></div>
              <div><strong>Remote</strong><span>Friendly</span></div>
              <div><strong>5★</strong><span>Work Culture</span></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="careers-filters">
          <input
            className="careers-search"
            placeholder="Search roles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="filter-group">
            {DEPTS.map(d => (
              <button key={d} className={`filter-btn ${dept===d?'active':''}`} onClick={() => setDept(d)}>{d}</button>
            ))}
          </div>
          <div className="filter-group">
            {TYPES.map(t => (
              <button key={t} className={`filter-btn ${type===t?'active':''}`} onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* Job listings */}
        <div className="jobs-wrap">
          <p className="jobs-count">{filtered.length} role{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="jobs-grid">
            {filtered.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-card-top">
                  <div>
                    <span className={`job-type-badge ${job.type === 'Internship' ? 'intern' : ''}`}>{job.type}</span>
                    <h3>{job.title}</h3>
                    <p className="job-meta">{job.dept} · {job.location} · {job.exp}</p>
                  </div>
                </div>
                <p className="job-desc">{job.desc}</p>
                <div className="job-card-footer">
                  <div className="job-tags">
                    <span className="job-tag">{job.dept}</span>
                    <span className="job-tag">{job.exp}</span>
                  </div>
                  <button className="btn-apply" onClick={() => setActive(job)}>Apply Now →</button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-jobs">
              <p>No roles found for your search. Try a different filter.</p>
            </div>
          )}
        </div>

        {/* Perks */}
        <div className="perks-section">
          <h2>Why Work at <em>Soft Master Technology?</em></h2>
          <div className="perks-grid">
            {[
              { icon:'🚀', title:'Real Projects', desc:'Work on live client products from day one — not just training exercises.' },
              { icon:'💰', title:'Competitive Pay', desc:'Market-rate salaries with performance bonuses and annual increments.' },
              { icon:'🌍', title:'Remote Friendly', desc:'Most roles offer full remote or hybrid working options.' },
              { icon:'📚', title:'Learning Budget', desc:'Annual budget for courses, certifications, and conferences.' },
              { icon:'🏥', title:'Health Benefits', desc:'Health insurance for you and your immediate family members.' },
              { icon:'⚡', title:'Fast Growth', desc:'Clear career paths with promotions based on merit, not tenure.' },
            ].map(p => (
              <div className="perk-card" key={p.title}>
                <div className="perk-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />

      {activeJob && <ApplyModal job={activeJob} onClose={() => setActive(null)} />}
    </>
  )
}
