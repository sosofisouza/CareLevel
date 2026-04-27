import React from 'react';
import './CareMoodColumn.css';

export default function CareMoodColumn({ onQuestionario }) {
  return (
    <div className="cm-col">
      <div className="cm-title-bar">CareMood©</div>

      <div className="card cm-card">
        <p className="cm-subtitle">
          Responda o questionário para avaliar seus sentimentos e impressões do dia de hoje!
        </p>
        <button className="btn-quest" onClick={onQuestionario}>
          QUESTIONÁRIO
        </button>
      </div>

      <div className="card cm-camera-card">
        <div className="camera-icon-wrap">
          <span role="img" aria-label="camera">📷</span>
          <span className="camera-plus">+</span>
        </div>
        <div className="cm-camera-text">
          Utilize o "Teste seu bem-estar" para uma análise precisa!
        </div>
      </div>

      <div className="card cm-mental-card">
        <span className="mental-help-text">MENTAL HELP</span>
      </div>
    </div>
  );
}
