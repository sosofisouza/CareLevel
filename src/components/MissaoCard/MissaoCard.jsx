/**
 * components/MissaoCard/MissaoCard.jsx
 * COMPONENTE REUTILIZÁVEL — Card de uma missão individual.
 * 
 * Usado em: pages/Missoes/index.jsx
 * Recebe via props:
 *   - numero    : número da missão (ex: 1, 2, 3)
 *   - titulo    : nome da missão (ex: "Ande 2km")
 *   - pontos    : quantos pontos vale
 *   - progresso : porcentagem de conclusão (0-100)
 * 
 * Exemplo de uso:
 *   <MissaoCard numero={1} titulo="Ande 2km" pontos={15} progresso={100} />
 */
export default function MissaoCard({ numero, titulo, pontos, progresso }) {
  return (
    <div>
      <span>{numero}</span>
      <span>{titulo}</span>
      <span>{pontos} pts</span>
      <span>{progresso}%</span>
      {/* TODO: adicionar círculo de progresso animado */}
    </div>
  )
}
