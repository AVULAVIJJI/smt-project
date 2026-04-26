import requests

res = requests.post('http://127.0.0.1:8000/api/employee/login', json={
    "email": "vijayalakshmiavula8@gmail.com",
    "password": "smt123"
})
print(res.status_code)
print(res.json())