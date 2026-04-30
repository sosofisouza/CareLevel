import styles from './RecompensaCard.module.css'

export default function RecompensaCard({ recompensa, onResgatar }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagemWrap}>
        <img
          src={recompensa.imagem}
          alt={recompensa.nome}
          className={styles.imagem}
        />
      </div>

      <div className={styles.rodape}>
        <p className={styles.nome}>{recompensa.nome}</p>

        <div className={styles.custo}>
          <span className={styles.icone}>⏱</span>
          <span className={styles.custoValor}>{recompensa.custo}</span>
        </div>

        <button
          className={styles.btnResgatar}
          onClick={() => onResgatar(recompensa)}
        >
          RESGATAR
        </button>
      </div>
    </div>
  )
}
