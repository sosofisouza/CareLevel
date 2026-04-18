/**
 * components/Badge/Badge.jsx
 * COMPONENTE REUTILIZÁVEL — Etiqueta/conquista visual.
 * 
 * Recebe via props:
 *   - label : texto da badge
 *   - cor   : 'verde' | 'amarelo' | 'vermelho' (padrão: verde)
 * 
 * Exemplo de uso:
 *   <Badge label="Nível 10" cor="verde" />
 */
export default function Badge({ label, cor = 'verde' }) {
  return <span data-cor={cor}>{label}</span>
}
