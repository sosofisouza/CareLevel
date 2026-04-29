import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { fetchCarepoints } from "../../services/api";
import styles from "./CarePoints.module.css";

const PAGE_SIZE = 4;

function Bar({ b, maxVal }) {
  const [tooltip, setTooltip] = useState(null);
  const ref = useRef(null);
  const BAR_MAX_PX = 110;
  const heightPx = Math.round((b.valor / maxVal) * BAR_MAX_PX);

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
          background: b.destaque ? "#53ad8b" : "#387a60",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setTooltip(null)}
      />
      <span className={styles.barLabel}>{b.mes}</span>
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
              {b.valor.toLocaleString("pt-BR")} pts
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
  const [dados, setDados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarepoints().then(setDados).catch(console.error);
  }, []);

  const analise = dados?.analise ?? [];
  const historico = dados?.historico ?? [];
  const maxVal = analise.length > 0 ? Math.max(...analise.map((b) => b.valor)) : 1;

  const historicoFiltrado = historico.filter((row) =>
    row.atividade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* TOP */}
          <div className={styles.topSection}>
            <div className={styles.cardGrafico}>
              {/* Esquerda */}
              <div className={styles.cardLeft}>
                <p className={styles.cardPontos}>
                  {dados ? dados.saldo.toLocaleString("pt-BR") : "—"}
                </p>
                <p className={styles.cardTitulo}>CarePoints</p>
                <p className={styles.cardValidade}>
                  Válidos até {dados?.validadePoints ?? "—"}
                </p>
                <button className={styles.btnResgate}>RESGATE AQUI</button>
              </div>

              {/* Direita (gráfico) */}
              <div className={styles.cardRight}>
                <p className={styles.graficoLabel}>ANÁLISE ÚLTIMOS MESES</p>
                <div className={styles.graficoArea}>
                  {analise.map((b, i) => (
                    <Bar key={i} b={b} maxVal={maxVal} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* HISTÓRICO */}
          <div className={styles.historicoSection}>
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

            <div className={styles.tabelaWrapper}>
              <div className={styles.tabelaHeader}>
                <span>Data</span>
                <span>Atividade</span>
                <span className={styles.tabelaHeaderRight}>Pontos</span>
              </div>

              <div className={styles.tabelaLinhas}>
                {historicoFiltrado.slice(0, PAGE_SIZE).map((row, i) => (
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
