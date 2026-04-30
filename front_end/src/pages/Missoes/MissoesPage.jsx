import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import { fetchMissoes } from '../../services/api';
import './MissoesPage.css';

function LinearProgress({ value }) {
  return (
    <div className="linear-progress-wrap">
      <div className="linear-progress-header">
        <span className="linear-progress-label">Progresso geral</span>
        <span className="linear-progress-pct">{value}%</span>
      </div>
      <div className="linear-progress-track">
        <div
          className="linear-progress-bar"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MissionItem({ missao, concluida, onToggle }) {
  return (
    <div
      className={`mission-item ${concluida ? 'mission-done' : ''}`}
      onClick={() => onToggle(missao.id)}
      title={concluida ? 'Clique para desmarcar' : 'Clique para marcar como concluída'}
    >
      <div className="mission-check">
        {concluida ? '✓' : missao.id}
      </div>
      <div className="mission-info">
        <span className={`mission-title ${concluida ? 'mission-title-done' : ''}`}>{missao.titulo}</span>
        <span className="mission-points">
          <svg className="clock-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {missao.pontos}
        </span>
      </div>
      <div className="mission-status-icon">
        {concluida ? '🏆' : '⭕'}
      </div>
    </div>
  );
}

export default function MissoesPage() {
  const [aba, setAba] = useState('equipe');
  const [missoes, setMissoes] = useState(null);
  const [concluidas, setConcluidas] = useState({});

  useEffect(() => {
    fetchMissoes().then(setMissoes).catch(console.error);
  }, []);

  const dados = missoes?.[aba];
  const itens = dados?.itens ?? [];

  const toggleConcluida = (id) => {
    const key = `${aba}_${id}`;
    setConcluidas(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalConcluidas = itens.filter(m => concluidas[`${aba}_${m.id}`]).length;
  const progresso = itens.length > 0 ? Math.round((totalConcluidas / itens.length) * 100) : 0;

  return (
    <>
      <NavBar />
      <div className="missoes-page">
        <div className="tabs">
          <button
            className={`tab-btn ${aba === 'equipe' ? 'active' : ''}`}
            onClick={() => setAba('equipe')}
          >
            Equipe
          </button>
          <button
            className={`tab-btn ${aba === 'individual' ? 'active' : ''}`}
            onClick={() => setAba('individual')}
          >
            Individual
          </button>
        </div>

        <div className="missions-card">
          <div className="tempo-row">
            <span className="tempo-label">Tempo restante</span>
            <span className="tempo-value">{dados?.tempo ?? '—'}</span>
          </div>

          <LinearProgress value={progresso} />

          <div className="missions-list">
            {itens.map(m => (
              <MissionItem
                key={m.id}
                missao={m}
                concluida={!!concluidas[`${aba}_${m.id}`]}
                onToggle={toggleConcluida}
              />
            ))}
          </div>

          <div className="missions-summary">
            {totalConcluidas} de {itens.length} missões concluídas
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
