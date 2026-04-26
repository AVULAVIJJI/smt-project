import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Employee.css'

const PRIORITIES = ['High', 'Medium', 'Low']
const STATUSES   = ['Pending', 'In Progress', 'Done']

export default function EmployeeTasks() {
const [tasks, setTasks]   = useState([])
const [showForm, setShow] = useState(false)
const [form, setForm]     = useState({ title:'', priority:'Medium', due:'', status:'Pending' })

// ✅ Fetch tasks from backend
useEffect(() => {
const fetchTasks = async () => {
try {
const token = localStorage.getItem("token")


    const res = await axios.get(
      "http://localhost:8000/api/admin/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setTasks(res.data)

  } catch (err) {
    console.error("Error fetching tasks:", err)
  }
}

fetchTasks()


}, [])

// ✅ Add task (UI only for now)
const addTask = e => {
e.preventDefault()
if (!form.title || !form.due) return


setTasks(prev => [...prev, { id: Date.now(), ...form }])
setForm({ title:'', priority:'Medium', due:'', status:'Pending' })
setShow(false)


}

// ✅ Update status with API
const changeStatus = async (id, status) => {
try {
const token = localStorage.getItem("token")


  await axios.patch(
    `http://localhost:8000/api/tasks/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))

} catch (err) {
  console.error("Status update failed:", err)
}


}

const priorityColor = p =>
p === 'High' ? 'badge-red' :
p === 'Medium' ? 'badge-yellow' :
'badge-green'

return ( <div className="emp-page"> <div className="emp-page-header"> <div> <h1>My Tasks</h1> <p>Track your assignments and progress</p> </div>
<button className="emp-btn-primary" onClick={() => setShow(true)}>
+ Add Task </button> </div>


  <div className="emp-stats-row">
    {STATUSES.map(s => (
      <div className="emp-stat-card" key={s}>
        <div className="emp-stat-value">
          {tasks.filter(t => t.status === s).length}
        </div>
        <div className="emp-stat-label">{s}</div>
      </div>
    ))}
    <div className="emp-stat-card">
      <div className="emp-stat-value">{tasks.length}</div>
      <div className="emp-stat-label">Total Tasks</div>
    </div>
  </div>

  <div className="emp-tasks-list">
    {STATUSES.map(status => {
      const group = tasks.filter(t => t.status === status)
      if (!group.length) return null

      return (
        <div className="emp-section" key={status}>
          <h2>
            {status}
            <span className="emp-count-badge">{group.length}</span>
          </h2>

          {group.map(task => (
            <div className="emp-task-card" key={task.id}>
              <div className="emp-task-info">
                <div className="emp-task-title">{task.title}</div>
                <div className="emp-task-meta">
                  <span className={`emp-badge ${priorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="emp-task-due">
                    Due: {task.due}
                  </span>
                </div>
              </div>

              <select
                className="emp-status-select"
                value={task.status}
                onChange={e => changeStatus(task.id, e.target.value)}
              >
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      )
    })}
  </div>

  {showForm && (
    <div className="emp-modal-overlay" onClick={() => setShow(false)}>
      <div className="emp-modal-box" onClick={e => e.stopPropagation()}>
        <div className="emp-modal-head">
          <h3>Add New Task</h3>
          <button className="emp-modal-x" onClick={() => setShow(false)}>✕</button>
        </div>

        <form className="emp-form" onSubmit={addTask}>
          <div className="emp-field">
            <label>Task Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              required
            />
          </div>

          <div className="emp-form-row">
            <div className="emp-field">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value})}
              >
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>

            <div className="emp-field">
              <label>Due Date</label>
              <input
                type="date"
                value={form.due}
                onChange={e => setForm({...form, due: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="emp-btn-primary" style={{width:'100%'}}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  )}
</div>


)
}
