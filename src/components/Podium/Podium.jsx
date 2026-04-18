/**
 * components/Podium/Podium.jsx
 * COMPONENTE REUTILIZÁVEL — Pódio com os 3 primeiros colocados.
 *
 * Usado em: pages/Ranking/index.jsx
 * Recebe via props:
 *   - top3: array com 3 objetos { nome, valor, medalha, avatar, letra?, emoji?, img? }
 */
import styles from './Podium.module.css'

function Avatar({ item }) {
  if (item.avatar === 'foto' && item.img) {
    return <img src={item.img} alt={item.nome} className={styles.avatarImg} />
  }
  if (item.avatar === 'emoji') {
    return (
      <div className={styles.avatarPlaceholder}>
        <span>{item.emoji}</span>
      </div>
    )
  }
  // letra (default)
  return (
    <div className={styles.avatarPlaceholder}>
      {item.letra ?? item.nome.charAt(0)}
    </div>
  )
}

export default function Podium({ top3 = [] }) {
  if (top3.length === 0) return null

  // Ordem visual: 2º | 1º | 3º  (igual ao design)
  const [segundo, primeiro, terceiro] = top3

  const renderItem = (item) => (
    <div className={styles.item} key={item.nome}>
      <div className={styles.avatarWrap}>
        <Avatar item={item} />
        <span className={styles.medalha}>{item.medalha}</span>
      </div>
      <span className={styles.nome}>{item.nome}</span>
      <span className={styles.valor}>{item.valor}</span>
    </div>
  )

  return (
    <div className={styles.lista}>
      {segundo  && renderItem(segundo)}
      {primeiro && renderItem(primeiro)}
      {terceiro && renderItem(terceiro)}
    </div>
  )
}
