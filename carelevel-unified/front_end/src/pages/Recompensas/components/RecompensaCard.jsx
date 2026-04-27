/**
 * components/RecompensaCard/RecompensaCard.jsx
 * COMPONENTE — Card de uma recompensa disponível para resgate.
 *
 * Props:
 *   - recompensa : objeto { id, nome, custo, imagem }
 *   - onResgatar : função chamada quando o usuário clica em "Resgatar"
 */
import styles from './RecompensaCard.module.css'

export default function RecompensaCard({ recompensa, onResgatar }) {
  return (
    <div className={styles.card}>

      {/* Imagem da recompensa */}
      <div className={styles.imagemWrap}>
        <img
          src={recompensa.imagem}
          alt={recompensa.nome}
          className={styles.imagem}
        />
      </div>

      {/* Rodapé verde */}
      <div className={styles.rodape}>
        <p className={styles.nome}>{recompensa.nome}</p>

        <div className={styles.custo}>
          {/* Ícone de relógio / moeda */}
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
