import { useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import RecompensaCard from './components/RecompensaCard';
import Modal from './components/Modal';
import styles from './Recompensas.module.css';

const RECOMPENSAS = [
  {
    id: 1,
    nome: 'Ingressos para cinema',
    custo: 500,
    imagem: 'https://images.unsplash.com/photo-1570360519836-b4a1aa51e419?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    nome: 'Snacks saudáveis',
    custo: 300,
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    nome: 'Cesta de frutas frescas',
    custo: 800,
    imagem: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    nome: 'Vale-refeição',
    custo: 400,
    imagem: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    nome: 'Day off adicional',
    custo: 1000,
    imagem: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    nome: 'Sessão de massagem',
    custo: 700,
    imagem: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop',
  },
];

export default function RecompensasPage() {
  const [pontos, setPontos] = useState(1490);
  const [recompensaSelecionada, setRecompensaSelecionada] = useState(null);
  const [tipoModal, setTipoModal] = useState(null);

  function handleResgatar(recompensa) {
    setRecompensaSelecionada(recompensa);
    if (recompensa.custo > pontos) {
      setTipoModal('erro-saldo');
    } else {
      setTipoModal('confirmacao');
    }
  }

  function handleConfirmar() {
    const erroSimulado = Math.random() < 0.2;
    if (erroSimulado) {
      setTipoModal('erro-processamento');
    } else {
      setPontos(prev => prev - recompensaSelecionada.custo);
      setTipoModal('sucesso');
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
          {RECOMPENSAS.map(recompensa => (
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
    </>
  );
}
