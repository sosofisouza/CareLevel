import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { historico, PAGE_SIZE } from "../../data/historico";
import styles from "./CarePoints.module.css";

const bars = [
  { value: 820,  label: "Fev", highlight: false },
  { value: 1050, label: "Mar", highlight: false },
  { value: 1340, label: "Abr", highlight: false },
  { value: 1490, label: "Mai", highlight: true  },
];

const maxBarValue = Math.max(...bars.map((b) => b.value));
const BAR_MAX_PX = 110;

function Bar({ b }) {
  const [tooltip, setTooltip] = useState(null);
  const ref = useRef(null);
  const heightPx = Math.round((b.value / maxBarValue) * BAR_MAX_PX);

  const handleMouseEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setTooltip({ x: r.left + r.width / 2, y: r.top });
    }
  };

  return (
    <div className={styles.barWrapper}>
      <div
        ref={ref}
        className={styles.bar}
        style={{
          height: `${heightPx}px`,
          background: b.highlight ? "#53ad8b" : "#387a60",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setTooltip(null)}
      />
      <span className={styles.barLabel}>{b.label}</span>
      {tooltip &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, calc(-100% - 6px))",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <div className={styles.barTooltip}>
              {b.value.toLocaleString("pt-BR")} pts
            </div>
            <div className={styles.barTooltipArrow} />
          </div>,
          document.body
        )}
    </div>
  );
}

function HistoricoRow({ row }) {
  return (
    <div
      className={styles.historicoRow}
      style={{ background: row.tipo === "debito" ? "#3a8a69" : "#6fcfaa" }}
    >
      <div className={styles.historicoDate}>
        <div className={styles.historicoIcon}>
          {row.tipo === "debito" ? "↓" : "↑"}
        </div>
        <span className={styles.historicoDateText}>{row.data}</span>
      </div>
      <span className={styles.historicoAtividade}>{row.atividade}</span>
      <div className={styles.historicoPontosWrapper}>
        <span className={styles.historicoPontos}>{row.pontos}</span>
      </div>
    </div>
  );
}

export default function CarePoints() {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* TOP */}
          <div className={styles.topSection}>

            {/* Card + Gráfico */}
            <div className={styles.cardGrafico}>
              {/* Esquerda */}
              <div className={styles.cardLeft}>
                <p className={styles.cardPontos}>1.490</p>
                <p className={styles.cardTitulo}>CarePoints</p>
                <p className={styles.cardValidade}>Válidos até 01/2026</p>
                <button className={styles.btnResgate}>RESGATE AQUI</button>
              </div>

              {/* Direita (gráfico) */}
              <div className={styles.cardRight}>
                <p className={styles.graficoLabel}>ANÁLISE ÚLTIMOS MESES</p>
                <div className={styles.graficoArea}>
                  {bars.map((b, i) => (
                    <Bar key={i} b={b} />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* HISTÓRICO */}
          <div className={styles.historicoSection}>

            {/* Header */}
            <div className={styles.historicoHeader}>
              <h2 className={styles.historicoTitulo}>Histórico de CarePoints</h2>

              <div className={styles.buscaWrapper}>
                <input
                  placeholder="Buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className={styles.buscaInput}
                />
                <span className={styles.buscaIcon}>🔍</span>
              </div>
            </div>

            {/* Tabela */}
            <div className={styles.tabelaWrapper}>
              <div className={styles.tabelaHeader}>
                <span>Data</span>
                <span>Atividade</span>
                <span className={styles.tabelaHeaderRight}>Pontos</span>
              </div>

              <div className={styles.tabelaLinhas}>
                {historico
                  .filter((row) =>
                    row.atividade.toLowerCase().includes(busca.toLowerCase())
                  )
                  .slice(0, PAGE_SIZE)
                  .map((row, i) => (
                    <HistoricoRow key={i} row={row} />
                  ))}
              </div>

              {historico.length > PAGE_SIZE && (
                <div className={styles.verMaisWrapper}>
                  <button
                    onClick={() => navigate("/carepoints/historico")}
                    className={styles.btnVerMais}
                  >
                    Ver mais
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
