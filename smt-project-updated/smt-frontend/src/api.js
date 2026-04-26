const BASE = '/api'

function getToken() {
  return localStorage.getItem('smt_token')
}

async function req(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    // 🔥 IMPORTANT: show real backend error
    if (!res.ok) {
      const text = await res.text()
      console.error('BACKEND ERROR:', text)
      throw new Error(text || 'Request failed')
    }

    return await res.json()

  } catch (err) {
    console.error('FETCH ERROR:', err)
    throw err
  }
}

export const api = {
  get:    (path)       => req('GET',    path),
  post:   (path, body) => req('POST',   path, body),
  put:    (path, body) => req('PUT',    path, body),
  patch:  (path, body) => req('PATCH',  path, body),
  delete: (path)       => req('DELETE', path),
}