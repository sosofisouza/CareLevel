/**
 * services/moodService.js
 * SERVIÇO DE HUMOR — registra e busca dados do CareMood.
 */
import { apiFetch } from './api'

export function getMoodSemanal() {
  return apiFetch('/caremood/semanal')
}

export function registrarHumor(humor) {
  return apiFetch('/caremood/registrar', {
    method: 'POST',
    body: JSON.stringify({ humor }),
  })
}
