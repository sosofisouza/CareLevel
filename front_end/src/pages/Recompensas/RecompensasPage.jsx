import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';

import RecompensaCard from './components/RecompensaCard';
import Modal from './components/Modal';
import { fetchRecompensas, resgatarRecompensa } from '../../services/api';
import { useUser } from '../../Components/UserContext/UserContext';
import styles from './Recompensas.module.css';

export default function RecompensasPage() {
  const { user, updatePoints } = useUser();
  const [pontos, setPontos] = useState(user.points);
  const [recompensas, setRecompensas] = useState([]);
  const [recompensaSelecionada, setRecompensaSelecionada] = useState(null);
  const [tipoModal, setTipoModal] = useState(null);

  useEffect(() => {
    fetchRecompensas().then(setRecompensas).catch(console.error);
  }, []);

  useEffect(() => {
    setPontos(user.points);
  }, [user.points]);

  function handleResgatar(recompensa) {
    setRecompensaSelecionada(recompensa);
    if (recompensa.custo > pontos) {
      setTipoModal('erro-saldo');
    } else {
      setTipoModal('confirmacao');
    }
  }

  async function handleConfirmar() {
    try {
      const resultado = await resgatarRecompensa(recompensaSelecionada.id);
      const delta = -recompensaSelecionada.custo;
      setPontos(resultado.saldo);
      updatePoints(delta);
      setTipoModal('sucesso');
    } catch (err) {
      const msg = err?.response?.data?.erro ?? '';
      if (msg === 'Saldo insuficiente') {
        setTipoModal('erro-saldo');
      } else {
        setTipoModal('erro-processamento');
      }
    }
  }

  function handleFecharModal() {
    setTipoModal(null);
    setRecompensaSelecionada(null);
  }

  function handleTentarNovamente() {
    setTipoModal('confirmacao');
  }

  return (
    <>
      <NavBar />
      <div className={styles.pagina}>
        <div className={styles.tituloBadge}>
          RESGATE DE RECOMPENSAS
        </div>

        <div className={styles.grade}>
          {recompensas.map(recompensa => (
            <RecompensaCard
              key={recompensa.id}
              recompensa={recompensa}
              onResgatar={handleResgatar}
            />
          ))}
        </div>

        {tipoModal && (
          <Modal
            tipo={tipoModal}
            recompensa={recompensaSelecionada}
            saldoAtual={pontos}
            onCancelar={handleFecharModal}
            onConfirmar={handleConfirmar}
            onTentarNovamente={handleTentarNovamente}
            onMaisResgates={handleFecharModal}
            onVoltarMenu={handleFecharModal}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
