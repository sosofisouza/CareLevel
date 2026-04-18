/**
 * services/api.js
 * CONFIGURAÇÃO CENTRAL da API HTTP.
 * 
 * O que faz:
 *  - Define a URL base do backend (mude aqui e vale para todo o projeto)
 *  - Função auxiliar para fazer requisições com tratamento de erro
 * 
 * Todos os outros services (missaoService, rankingService, etc.)
 * usam esta função para fazer chamadas HTTP.
 */
const BASE_URL = 'https://api.carelevel.com.br' // ← troque pela URL real

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) throw new Error(`Erro ${response.status}: ${endpoint}`)
  return response.json()
}
