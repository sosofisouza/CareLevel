/**
 * components/MoodBoard/MoodBoard.jsx
 * COMPONENTE REUTILIZÁVEL — Moodboard semanal (bolinhas coloridas por dia).
 * 
 * Usado em: pages/CareMood/index.jsx
 * Recebe via props:
 *   - dias: array de 7 objetos { dia: 'Seg', humor: 'feliz'|'neutro'|'triste'|'furioso' }
 * 
 * Exemplo de uso:
 *   <MoodBoard dias={[{ dia: 'Seg', humor: 'feliz' }, ...]} />
 */
export default function MoodBoard({ dias = [] }) {
  const cores = { feliz: 'green', neutro: 'gray', triste: 'blue', furioso: 'red' }
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {dias.map((d, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: cores[d.humor] || 'gray' }} />
          <span style={{ fontSize: 12 }}>{d.dia}</span>
        </div>
      ))}
    </div>
  )
}
