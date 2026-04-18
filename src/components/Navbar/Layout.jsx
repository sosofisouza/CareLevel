/**
 * Layout.jsx
 * ESTRUTURA VISUAL GLOBAL que envolve todas as páginas.
 * 
 * O que faz:
 *  - Exibe a Navbar no topo de TODAS as páginas
 *  - O <Outlet /> é onde o React Router "injeta" a página atual
 *  - Se você quiser um rodapé global, adicione aqui também
 */
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />  {/* ← a página ativa aparece aqui */}
      </main>
    </div>
  )
}
