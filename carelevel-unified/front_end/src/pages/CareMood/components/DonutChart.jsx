import React, { useMemo } from 'react';
import './DonutChart.css';

const C = 502.65;

/**
   @param {Array<{status, pct, color}>} donutData
 */
function buildSegments(donutData) {
  let offset = 0;
  return donutData.map(({ status, pct, color }) => {
    const dash = (pct / 100) * C;
    const seg = { status, pct, color, dash, offset: -offset };
    offset += dash;
    return seg;
  });
}

/**
 
 */
const LABEL_POSITIONS = [
  { style: { left: '-10px', top: '40px' } },
  { style: { right: '-10px', top: '40px' } },
  { style: { bottom: '-16px', left: '50%', transform: 'translateX(-50%)' } },
  { style: { top: '-16px', left: '50%', transform: 'translateX(-50%)' } },
];

export default function DonutChart({ donutData = [], predominant }) {
  const segments = useMemo(() => buildSegments(donutData), [donutData]);
  const hasData = segments.length > 0;

  return (
    <div className="card donut-card">
      <p className="section-title">STATUS PREDOMINANTES NO MÊS:</p>

      {!hasData ? (
        <div className="donut-empty">
          <p>Nenhum dado registrado neste mês.</p>
          <p>Complete o questionário para ver seu histórico.</p>
        </div>
      ) : (
        <div className="donut-area">
          <div className="donut-chart-wrap">

            
            {segments.map(({ status, pct }, i) => (
              <div
                key={status}
                className="donut-label"
                style={LABEL_POSITIONS[i % LABEL_POSITIONS.length].style}
              >
                {status}
                <br />
                {pct}%
              </div>
            ))}

            
            <svg width="220" height="220" viewBox="0 0 220 220">
              {segments.map(({ status, color, dash, offset }) => (
                <circle
                  key={status}
                  cx="110" cy="110" r="80"
                  fill="none"
                  stroke={color}
                  strokeWidth="42"
                  strokeDasharray={`${dash} ${C}`}
                  strokeDashoffset={offset}
                  transform="rotate(-90 110 110)"
                />
              ))}
              
              <circle cx="110" cy="110" r="59" fill="white" />
              
              {predominant && (
                <>
                  <text
                    x="110" y="105"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#555"
                    fontFamily="var(--font)"
                  >
                    Predominante
                  </text>
                  <text
                    x="110" y="122"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#0C3F2F"
                    fontFamily="var(--font)"
                  >
                    {predominant}
                  </text>
                </>
              )}
            </svg>

          </div>
        </div>
      )}
    </div>
  );
}
