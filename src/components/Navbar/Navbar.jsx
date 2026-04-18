/**
 * Navbar.jsx
 * BARRA DE NAVEGAÇÃO superior do site.
 * 
 * O que faz:
 *  - Exibe logo, links de navegação, streak e pontos do usuário
 *  - Usa <NavLink> do React Router (destaca o link da página atual)
 *  - Para adicionar nova aba: copie um <NavLink> e ajuste path + nome
 */
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>CareLevel</div>

      <nav className={styles.nav}>
        {/* NavLink adiciona classe "active" automaticamente na rota atual */}
        <NavLink to="/missoes"     className={({ isActive }) => isActive ? styles.ativo : ''}>Missões</NavLink>
        <NavLink to="/caremood"    className={({ isActive }) => isActive ? styles.ativo : ''}>CareMood</NavLink>
        <NavLink to="/ranking"     className={({ isActive }) => isActive ? styles.ativo : ''}>Ranking</NavLink>
        <NavLink to="/recompensas" className={({ isActive }) => isActive ? styles.ativo : ''}>Recompensas</NavLink>
        <NavLink to="/conquistas"  className={({ isActive }) => isActive ? styles.ativo : ''}>Conquistas</NavLink>
        <NavLink to="/carepoints"  className={({ isActive }) => isActive ? styles.ativo : ''}>CarePoints</NavLink>
      </nav>

      <div className={styles.headerRight}>
        <span>🔥 5</span>
        <span>● 1.490</span>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  )
}
