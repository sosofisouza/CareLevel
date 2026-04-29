import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { fetchMissoes } from '../../services/api';
import './MissoesPage.css';

/* ── Circular progress SVG ── */
function CircularProgress({ value }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="cp-wrap">
      <svg width="54" height="54" viewBox="0 0 54 54">
        <circle cx="27" cy="27" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
        <circle
          cx="27" cy="27" r={r}
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 27 27)"
        />
      </svg>
      <span className="cp-label">{value}%</span>
    </div>
  );
}

/* ── Single mission row ── */
function MissionItem({ missao }) {
  return (
    <div className="mission-item">
      <div className="mission-num">{missao.id}</div>
      <div className="mission-info">
        <span className="mission-title">{missao.titulo}</span>
        <span className="mission-points">
          <svg className="clock-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {missao.pontos}
        </span>
      </div>
      <CircularProgress value={missao.progresso} />
    </div>
  );
}

/* ── Main missions page ── */
export default function MissoesPage() {
  const [aba, setAba] = useState('equipe');
  const [missoes, setMissoes] = useState(null);

  useEffect(() => {
    fetchMissoes().then(setMissoes).catch(console.error);
  }, []);

  const dados = missoes?.[aba];

  return (
    <>
      <NavBar />
      <div className="missoes-page">
        {/* Tabs */}
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

        {/* Card container */}
        <div className="missions-card">
          <div className="tempo-row">
            <span className="tempo-label">Tempo restante</span>
            <span className="tempo-value">{dados?.tempo ?? '—'}</span>
          </div>

          <div className="missions-list">
            {(dados?.itens ?? []).map(m => (
              <MissionItem key={m.id} missao={m} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
