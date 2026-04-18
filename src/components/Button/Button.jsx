/**
 * components/Button/Button.jsx
 * COMPONENTE REUTILIZÁVEL — Botão padrão do CareLevel.
 * 
 * Recebe via props:
 *   - children  : texto do botão
 *   - onClick   : função ao clicar
 *   - variante  : 'primario' | 'secundario' (padrão: primario)
 *   - disabled  : boolean
 * 
 * Exemplo de uso:
 *   <Button onClick={() => alert('clicado!')}>Ativar ranking</Button>
 */
export default function Button({ children, onClick, variante = 'primario', disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} data-variante={variante}>
      {children}
    </button>
  )
}
