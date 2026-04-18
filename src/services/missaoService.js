/**
 * services/missaoService.js
 * SERVIÇO DE MISSÕES — busca e atualiza dados de missões.
 * 
 * Cada função corresponde a um endpoint do backend.
 * Os hooks (useMissoes.js) chamam estas funções.
 */
import { apiFetch } from './api'

// Busca todas as missões do usuário logado
export function getMissoes() {
  return apiFetch('/missoes')
}

// Marca uma missão como concluída
export function completarMissao(id) {
  return apiFetch(`/missoes/${id}/completar`, { method: 'POST' })
}
