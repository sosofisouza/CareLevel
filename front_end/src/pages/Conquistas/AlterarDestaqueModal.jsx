import { useState } from "react";
import styles from "./AlterarDestaqueModal.module.css";

const opcoes = [
  { grupo: null, items: ["Sem Título"] },
  { grupo: "Apenas 1%", items: ["Melhor corredor de 2023", "Top 10 melhores participantes de 2024"] },
  { grupo: "Apenas 20%", items: ["Participante da campanha agasalho SP"] },
];

export default function AlterarDestaqueModal({ atual, onClose, onSave }) {
  const [selecionado, setSelecionado] = useState(atual || "Sem Título");

  function handleSave() {
    onSave(selecionado);
    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.titulo}>Alterar destaque</h2>

        <div className={styles.opcoesList}>
          {opcoes.map(({ grupo, items }) => (
            <div key={grupo ?? "sem-grupo"}>
              {grupo && (
                <p className={styles.grupoLabel}>{grupo}</p>
              )}
              <div className={styles.itemsRow}>
                {items.map((item) => {
                  const ativo = selecionado === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setSelecionado(item)}
                      className={`${styles.itemBtn} ${ativo ? styles.itemBtnAtivo : ""}`}
                    >
                      <span className={`${styles.itemDot} ${ativo ? styles.itemDotAtivo : ""}`} />
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.btnCancelar}>
            Cancelar
          </button>
          <button onClick={handleSave} className={styles.btnSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
