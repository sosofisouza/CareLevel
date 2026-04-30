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

// ── Dados do app ────────────────────────────────────────────────

export async function fetchUsuario() {
  const { data } = await api.get('/api/usuario')
  return data
}

export async function fetchRanking() {
  const { data } = await api.get('/api/ranking')
  return data
}

export async function fetchMissoes() {
  const { data } = await api.get('/api/missoes')
  return data
}

export async function fetchRecompensas() {
  const { data } = await api.get('/api/recompensas')
  return data
}

export async function resgatarRecompensa(id) {
  const { data } = await api.post(`/api/recompensas/resgatar/${id}`)
  return data
}

export async function fetchCarepoints() {
  const { data } = await api.get('/api/carepoints')
  return data
}

export async function fetchConquistas() {
  const { data } = await api.get('/api/conquistas')
  return data
}

export async function salvarDestaque(destaque) {
  const { data } = await api.patch('/api/conquistas/destaque', { destaque })
  return data
}

export async function fetchCaremoodPerguntas() {
  const { data } = await api.get('/api/caremood/perguntas')
  return data
}

export async function fetchAdmin() {
  const { data } = await api.get('/api/admin')
  return data
}

export default api
