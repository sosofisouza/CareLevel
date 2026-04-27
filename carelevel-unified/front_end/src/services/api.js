import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3005',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  delete api.defaults.headers.common.Authorization
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  const token = data.token
  const decoded = token ? jwtDecode(token) : null
  const user = data.user ?? (decoded ? { id: decoded.id, role: decoded.role } : null)

  if (!user?.role) {
    throw new Error('Usuário sem role definida')
  }

  return { token, user }
}

export async function getProfile() {
  const { data } = await api.get('/auth/me')
  return data?.user
}

export async function updateProfile(payload) {
  const { data } = await api.patch('/auth/me', payload)
  return data
}

export default api