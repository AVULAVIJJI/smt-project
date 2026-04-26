import bcrypt
from supabase import create_client

db = create_client(
    'https://xlaeilpraybcgumjnbfy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWVpbHByYXliY2d1bWpuYmZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkyMDI5NSwiZXhwIjoyMDkwNDk2Mjk1fQ.i9QEj3EAe4XeVv1V7kcF3qtlqmq59bpsxVU3SQCtxEQ'
)

password = "smt123"
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

db.table("smt_employees").update({"password_hash": hashed}).eq("email", "vijayalakshmiavula8@gmail.com").execute()
print("✅ Password updated in smt_employees table!")