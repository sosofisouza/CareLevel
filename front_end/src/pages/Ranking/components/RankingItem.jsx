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
