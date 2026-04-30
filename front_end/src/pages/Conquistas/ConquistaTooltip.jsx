import { createPortal } from "react-dom";
import styles from "./ConquistaTooltip.module.css";

export default function ConquistaTooltip({ titulo, descricao, rodape, x, y, below }) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: below
          ? "translate(-50%, 12px)"
          : "translate(-50%, calc(-100% - 12px))",
        zIndex: 9999,
        width: 220,
        pointerEvents: "none",
        display: "flex",
        flexDirection: below ? "column-reverse" : "column",
      }}
    >
      <div className={styles.tooltipCard}>
        <div className={styles.tooltipHeader}>
          <div className={styles.tooltipIconWrapper}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <circle cx="14" cy="4" r="2" />
              <path
                d="M7 21l3-6 2 2 3-4 3 5"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12l4-3 3 2 3-3 3 1"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={styles.tooltipTitulo}>{titulo}</span>
        </div>

        <p className={styles.tooltipDescricao}>{descricao}</p>

        <div className={styles.tooltipRodape}>
          <span className={styles.tooltipRodapeText}>{rodape}</span>
        </div>
      </div>

      <div
        className={styles.tooltipArrow}
        style={{
          clipPath: below
            ? "polygon(50% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 50% 100%)",
        }}
      />
    </div>,
    document.body
  );
}
