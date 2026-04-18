/**
 * hooks/useMissoes.js
 * HOOK CUSTOMIZADO — Lógica de dados das Missões.
 * 
 * O que faz:
 *  - Busca a lista de missões (da API ou de dados locais)
 *  - Gerencia o estado de loading e erro
 *  - Disponibiliza funções para completar missões
 * 
 * Por que usar hooks?
 *  - Separa a LÓGICA (como buscar dados) da VISUAL (como exibir)
 *  - Pode ser reusado em diferentes componentes
 * 
 * Exemplo de uso na página:
 *   import { useMissoes } from '../../hooks/useMissoes'
 *   const { missoes, loading } = useMissoes()
 */
import { useState, useEffect } from 'react'
import { getMissoes } from '../services/missaoService'

export function useMissoes() {
  const [missoes, setMissoes]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [erro, setErro]         = useState(null)

  useEffect(() => {
    getMissoes()
      .then(setMissoes)
      .catch(setErro)
      .finally(() => setLoading(false))
  }, [])

  return { missoes, loading, erro }
}
