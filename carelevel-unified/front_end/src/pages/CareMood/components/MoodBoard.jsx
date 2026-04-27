import React from 'react';
import './MoodBoard.css';

export default function MoodBoard({ weekData = [] }) {
  return (
    <div className="moodboard-wrap">
      <p className="section-title center">MOODBOARD SEMANAL:</p>
      <div className="mood-bar card">
        {weekData.map(({ label, status, color, isToday, isFuture }) => (
          <div className={`mood-day ${isToday ? 'mood-day--today' : ''}`} key={label}>
            <span className={`day-label ${isToday ? 'day-label--today' : ''}`}>{label}</span>
            <div
              className={`mood-dot ${isFuture && !status ? 'mood-dot--future' : ''}`}
              style={{ backgroundColor: color }}
              title={status || (isFuture ? 'Dia futuro' : 'Sem dados')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
