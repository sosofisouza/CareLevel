/**
 * pages/Ranking/index.jsx
 * PÁGINA Ranking — rota: "/ranking"
 *
 * Features:
 *  - Toggle ativar/desativar ranking
 *  - Filtros por aba: Pontos Totais | Nível | Streak | Equipe
 *  - Gráfico de barras decorativo
 *  - Pódio dos 3 primeiros
 *  - Lista de ranking com destaque para "Você"
 */
import { useRanking } from '../../hooks/useRanking'
import Podium      from '../../components/Podium/Podium'
import RankingItem from '../../components/RankingItem/RankingItem'
import styles      from './Ranking.module.css'

const ABAS = [
  { id: 'pontos',  label: 'Pontos\nTotais' },
  { id: 'nivel',   label: 'Nível'          },
  { id: 'streak',  label: 'Streak'         },
  { id: 'equipe',  label: 'Equipe'         },
]

export default function Ranking() {
  const {
    abaAtual, setAbaAtual,
    podio, lista, voce,
    loading,
    rankingAtivo, toggleRanking,
  } = useRanking()

  /* ---------- TELA DESATIVADO ---------- */
  if (!rankingAtivo) {
    return (
      <div className={styles.telaDesativado}>
        <p className={styles.textoDesativado}>
          Ative o Ranking para ver<br />estatísticas
        </p>
        <button className={styles.btnAtivar} onClick={toggleRanking}>
          Ativar ranking...
        </button>
      </div>
    )
  }

  /* ---------- TELA ATIVADO ---------- */
  return (
    <main className={styles.main}>

      {/* ===== COLUNA ESQUERDA ===== */}
      <div className={styles.colunaEsquerda}>

        {/* Filtros / Tabs */}
        <div className={styles.filtros} role="group" aria-label="Filtros de ranking">
          {ABAS.map(aba => (
            <button
              key={aba.id}
              className={`${styles.filtroBtn} ${abaAtual === aba.id ? styles.ativo : ''}`}
              onClick={() => setAbaAtual(aba.id)}
            >
              {aba.label.split('\n').map((linha, i) => (
                <span key={i}>{linha}{i === 0 && aba.label.includes('\n') && <br />}</span>
              ))}
            </button>
          ))}
        </div>

        {/* Gráfico decorativo */}
        <div className={styles.graficoCard} aria-label="Gráfico de desempenho">
          <div className={styles.graficoBarras}>
            <div className={`${styles.barra} ${styles.barra1}`} />
            <div className={`${styles.barra} ${styles.barra2}`} />
            <div className={`${styles.barra} ${styles.barra3}`} />
          </div>
        </div>

        {/* Pódio */}
        <div className={styles.podioCard}>
          {loading
            ? <p className={styles.carregando}>Carregando...</p>
            : <Podium top3={podio} />
          }
        </div>

      </div>

      {/* ===== COLUNA DIREITA ===== */}
      <div className={styles.colunaDireita}>

        <div className={styles.rankingCard}>
          {loading ? (
            <p className={styles.carregando}>Carregando...</p>
          ) : (
            <>
              {lista.map(item => (
                <RankingItem
                  key={item.pos}
                  posicao={item.pos}
                  nome={item.nome}
                  valor={item.valor}
                />
              ))}
              {voce && (
                <RankingItem
                  posicao={voce.pos}
                  nome={voce.nome}
                  valor={voce.valor}
                  destaque
                />
              )}
            </>
          )}
        </div>

        <button className={styles.btnDesativar} onClick={toggleRanking}>
          Desativar ranking...
        </button>

      </div>
    </main>
  )
}
