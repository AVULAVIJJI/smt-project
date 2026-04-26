# SMT Project – v3.0 Changelog

## What Changed

### 🗄️ Database Strategy
| Feature | Database |
|---|---|
| Employees, Leaves, Tasks, Payslips, Jobs, Applications | **Supabase** (unchanged) |
| Chatbot logs | **MongoDB** (moved from Supabase) |
| Attendance | **MongoDB** (new) |
| Announcements | **MongoDB** (new) |
| IT Helpdesk tickets | **MongoDB** (new) |
| Reimbursements | **MongoDB** (new) |

---

### 🤖 Chatbot – Fixed
- Removed broken `axios` import; now uses native `fetch`
- Logs saved to MongoDB `chat_logs` collection
- Works correctly with the Vite `/api` proxy

---

### 🔐 Password Recovery – New
- Employee Login page now has **two tabs**: Sign In | Forgot Password
- Enter Employee ID + registered email → get a **temporary password**
- API endpoints:
  - `POST /api/employee/forgot-password` — verifies emp_id + email, sets temp password
  - `POST /api/employee/change-password` — change to a new password

---

### 📄 Payslip Download – Fixed
- Download button now generates a **real PDF** using ReportLab
- Professional layout: company header, employee details, earnings/deductions table, net pay
- Only `Paid` payslips can be downloaded
- API: `GET /api/employee/payslips/{id}/download`

---

### 🆕 New Employee Sections (MongoDB)
| Section | Path | What it does |
|---|---|---|
| Attendance | `/employee/my-data/attendance` | Check-in / check-out, monthly records |
| Announcements | `/employee/misc/announcements` | Company-wide announcements from admin |
| IT Helpdesk | `/employee/it/helpdesk` | Raise & track IT support tickets |
| Reimbursement | `/employee/finance/reimbursement` | Submit & track expense claims |

---

## Setup

### Backend
```bash
cd smt-backend
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

Edit `.env` — fill in your Supabase keys **and** MongoDB URI.
See `db/MONGODB_SETUP.md` for step-by-step MongoDB Atlas setup.

```bash
uvicorn server:app --reload --port 8000
```

### Frontend
```bash
cd smt-frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Environment Variables Required
```
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/...
MONGODB_DB=smt_db
JWT_SECRET=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=smt@2025
```
