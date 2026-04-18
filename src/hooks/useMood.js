/**
 * hooks/useMood.js
 * HOOK CUSTOMIZADO — Lógica do CareMood (estado emocional).
 * 
 * Gerencia: humor do dia, moodboard semanal, recomendações.
 * 
 * Exemplo de uso:
 *   import { useMood } from '../../hooks/useMood'
 *   const { humorHoje, diasSemana, recomendacoes } = useMood()
 */
import { useState } from 'react'

export function useMood() {
  const [humorHoje, setHumorHoje] = useState(null)

  const diasSemana = [
    { dia: 'Seg', humor: 'neutro' },
    { dia: 'Ter', humor: 'feliz' },
    { dia: 'Qua', humor: 'feliz' },
    { dia: 'Qui', humor: 'feliz' },
    { dia: 'Sex', humor: 'furioso' },
    { dia: 'Sáb', humor: 'triste' },
    { dia: 'Dom', humor: 'neutro' },
  ]

  return { humorHoje, setHumorHoje, diasSemana }
}
