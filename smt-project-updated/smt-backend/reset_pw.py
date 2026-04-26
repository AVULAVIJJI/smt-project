from supabase import create_client

db = create_client(
    'https://xlaeilpraybcgumjnbfy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWVpbHByYXliY2d1bWpuYmZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkyMDI5NSwiZXhwIjoyMDkwNDk2Mjk1fQ.i9QEj3EAe4XeVv1V7kcF3qtlqmq59bpsxVU3SQCtxEQ'
)

db.auth.admin.update_user_by_id(
    'ae5921ff-98ca-455c-84cb-1dffcb2ed981',
    {'password': 'smt123'}
)

print('Password updated successfully!')