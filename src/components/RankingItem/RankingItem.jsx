/**
 * components/RankingItem/RankingItem.jsx
 * COMPONENTE REUTILIZÁVEL — Linha de um item no ranking.
 *
 * Recebe via props:
 *   - posicao : número da posição (ex: 4)
 *   - nome    : nome do usuário/equipe
 *   - valor   : pontuação, nível ou streak
 *   - destaque: boolean — true se for "você"
 */
import styles from './RankingItem.module.css'

export default function RankingItem({ posicao, nome, valor, destaque = false }) {
  return (
    <div className={`${styles.item} ${destaque ? styles.voce : ''}`}>
      <span className={styles.pos}>{posicao}</span>
      <span className={styles.nome}>{nome}</span>
      <span className={styles.valor}>{valor}</span>
    </div>
  )
}
