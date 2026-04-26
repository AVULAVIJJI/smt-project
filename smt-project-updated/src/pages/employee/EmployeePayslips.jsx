import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Employee.css'

export default function EmployeePayslips() {

const [payslips, setPayslips] = useState([])

useEffect(() => {
const fetchData = async () => {
try {
const token = localStorage.getItem("token")


    const res = await axios.get(
      "http://localhost:8000/api/employee/payslips",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(res.data) // debug
    setPayslips(res.data)

  } catch (err) {
    console.error("Error fetching payslips:", err)
  }
}

fetchData()


}, [])

return ( <div className="emp-page"> <div className="emp-page-header"> <div> <h1>Pay Slips</h1> <p>Your monthly salary statements</p> </div> </div>


  <div className="emp-table-wrap">
    <table className="emp-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Gross Pay</th>
          <th>Deductions</th>
          <th>Net Pay</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {payslips.length > 0 ? (
          payslips.map((p, i) => (
            <tr key={i}>
              <td>{p.month}</td>
              <td>{p.gross_salary || p.salary}</td>
              <td className="emp-red">{p.deductions}</td>
              <td className="emp-green">
                <strong>{p.net_salary}</strong>
              </td>
              <td>
                <span className={`emp-badge ${p.status === 'Paid' ? 'badge-green' : 'badge-yellow'}`}>
                  {p.status}
                </span>
              </td>
              <td>
                {p.status === 'Paid'
                  ? <button
                      className="emp-btn-sm"
                      onClick={() => alert('Downloading ' + p.month + ' payslip...')}
                    >
                      ⬇ Download
                    </button>
                  : <span className="emp-muted">Not yet</span>
                }
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No payslips found
            </td>
          </tr>
        )}
      </tbody>

    </table>
  </div>
</div>


)
}
