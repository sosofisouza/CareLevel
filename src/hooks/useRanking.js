/**
 * hooks/useRanking.js
 * HOOK CUSTOMIZADO — Lógica de dados do Ranking.
 *
 * Gerencia: aba ativa (pontos/nivel/streak/equipe), dados do pódio e lista,
 * e estado de ativação/desativação do ranking.
 *
 * Exemplo de uso:
 *   import { useRanking } from '../../hooks/useRanking'
 *   const { abaAtual, setAbaAtual, podio, lista, voce, rankingAtivo, toggleRanking } = useRanking()
 */
import { useState, useEffect } from 'react'
import { getRanking } from '../services/rankingService'

export function useRanking() {
  const [abaAtual, setAbaAtual]       = useState('nivel')
  const [dados, setDados]             = useState({})
  const [loading, setLoading]         = useState(true)
  const [rankingAtivo, setRankingAtivo] = useState(true)

  useEffect(() => {
    setLoading(true)
    getRanking(abaAtual)
      .then(setDados)
      .finally(() => setLoading(false))
  }, [abaAtual])

  function toggleRanking() {
    setRankingAtivo(prev => !prev)
  }

  return {
    abaAtual,
    setAbaAtual,
    podio:        dados.podio ?? [],
    lista:        dados.lista ?? [],
    voce:         dados.voce  ?? null,
    loading,
    rankingAtivo,
    toggleRanking,
  }
}
