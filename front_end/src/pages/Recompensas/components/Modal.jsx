/**
 * components/Modal/Modal.jsx
 * COMPONENTE — Modal reutilizável para os 4 estados do fluxo de resgate.
 *
 * Props:
 *   - tipo         : 'confirmacao' | 'erro-saldo' | 'erro-processamento' | 'sucesso'
 *   - recompensa   : objeto { nome, custo } — a recompensa sendo resgatada
 *   - saldoAtual   : número — pontos do usuário antes do resgate
 *   - onCancelar   : fechar o modal sem fazer nada
 *   - onConfirmar  : confirmar o resgate (usado em 'confirmacao')
 *   - onTentarNovamente : tentar o resgate de novo (usado em 'erro-processamento')
 *   - onMaisResgates    : ir para mais resgates (usado em 'sucesso')
 *   - onVoltarMenu      : voltar ao menu (fecha o modal)
 */
import styles from './Modal.module.css'

export default function Modal({
  tipo,
  recompensa,
  saldoAtual,
  onCancelar,
  onConfirmar,
  onTentarNovamente,
  onMaisResgates,
  onVoltarMenu,
}) {
  // Calcula o saldo final para o modal de confirmação
  const saldoFinal = saldoAtual - (recompensa?.custo ?? 0)

  return (
    /* Overlay escuro por trás do modal */
    <div className={styles.overlay} onClick={onCancelar}>

      {/* Caixa do modal — stopPropagation evita fechar ao clicar dentro */}
      <div
        className={`${styles.caixa} ${styles[tipo.replace('-', '')]}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ══════════════════════════════
            MODAL: CONFIRMAÇÃO DE RESGATE
            ══════════════════════════════ */}
        {tipo === 'confirmacao' && (
          <>
            <h2 className={styles.tituloConfirmacao}>RESGATE DE RECOMPENSAS</h2>

            <div className={styles.confirmacaoCorpo}>
              {/* Miniatura da recompensa */}
              <img
                src={recompensa.imagem}
                alt={recompensa.nome}
                className={styles.miniaturaImg}
              />

              {/* Detalhes financeiros */}
              <div className={styles.detalhes}>
                <p className={styles.detalhesNome}>{recompensa.nome}</p>

                <table className={styles.tabela}>
                  <tbody>
                    <tr>
                      <td>Seu Saldo</td>
                      <td className={styles.valorPositivo}>{saldoAtual.toLocaleString('pt-BR')}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className={styles.valorNegativo}>-{recompensa.custo}</td>
                    </tr>
                    <tr>
                      <td>Saldo Final</td>
                      <td>{saldoFinal.toLocaleString('pt-BR')}</td>
                    </tr>
                  </tbody>
                </table>

                <p className={styles.pergunta}>Você deseja resgatar esta recompensa?</p>
              </div>
            </div>

            <div className={styles.botoes}>
              <button className={styles.btnCancelar} onClick={onCancelar}>
                CANCELAR
              </button>
              <button className={styles.btnConfirmar} onClick={onConfirmar}>
                RESGATAR
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            MODAL: ERRO — SALDO INSUFICIENTE
            ══════════════════════════════ */}
        {tipo === 'erro-saldo' && (
          <>
            <div className={styles.iconeErro}>✕</div>
            <h2 className={styles.tituloErro}>ERRO<br />SALDO INSUFICIENTE</h2>
            <p className={styles.mensagemErro}>
              Continue cumprindo suas metas e tente novamente em seguida
            </p>
            <div className={styles.botoes}>
              <button className={styles.btnCancelar} onClick={onCancelar}>
                CANCELAR
              </button>
              <button className={styles.btnAcao} onClick={onVoltarMenu}>
                VOLTAR AO MENU
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            MODAL: ERRO — PROCESSAMENTO
            ══════════════════════════════ */}
        {tipo === 'erro-processamento' && (
          <>
            <div className={styles.iconeErro}>✕</div>
            <h2 className={styles.tituloErro}>ERRO AO PROCESSAR RESGATE DE RECOMPENSA</h2>
            <p className={styles.mensagemErro}>
              Tente novamente ou volte a aba anterior
            </p>
            <div className={styles.botoes}>
              <button className={styles.btnCancelar} onClick={onCancelar}>
                CANCELAR
              </button>
              <button className={styles.btnAcao} onClick={onTentarNovamente}>
                TENTE<br />NOVAMENTE
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            MODAL: SUCESSO
            ══════════════════════════════ */}
        {tipo === 'sucesso' && (
          <>
            <div className={styles.iconeSucesso}>✓</div>
            <h2 className={styles.tituloSucesso}>RESGATE CONCLUÍDO<br />COM SUCESSO</h2>
            <p className={styles.mensagemSucesso}>
              Fale com o RH da sua empresa para obter a recompensa resgatada
            </p>
            <div className={styles.botoes}>
              <button className={styles.btnAcaoSucesso} onClick={onMaisResgates}>
                MAIS<br />RESGATES
              </button>
              <button className={styles.btnAcaoSucesso} onClick={onVoltarMenu}>
                VOLTAR<br />AO MENU
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
