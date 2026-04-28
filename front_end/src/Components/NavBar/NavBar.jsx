import { NavLink, useNavigate } from 'react-router-dom';
import { Flame, CircleHelp, User, LogOut } from 'lucide-react';
import { useUser } from '../UserContext/UserContext';
import { useAuth } from '../../context/AuthContext';

import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';

const NAV_LINKS = [
  { label: 'Missões',     to: '/missoes' },
  { label: 'CareMood',    to: '/caremood' },
  { label: 'Ranking',     to: '/ranking' },
  { label: 'Recompensas', to: '/recompensas' },
  { label: 'Conquistas',  to: '/conquistas' },
  { label: 'CarePoints',  to: '/pontos' },
];

export default function Navbar() {
  const { user, logout: userLogout } = useUser();
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    authLogout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logoArea}>
          <Logo size={32} />
        </NavLink>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>


          <div className={styles.badge} title="Sequência de dias">
            <Flame size={20} color="#ff6b35" fill="#ff6b35" />
            <span className={styles.badgeText}>{user.streak}</span>
          </div>

          <div className={styles.badge} title="CarePoints">
            <img
              src="/512x512bb%204.svg"
              alt="CarePoints"
              className={styles.pointsIconImage}
            />
            <span className={styles.badgeText}>
              {user.points.toLocaleString('pt-BR')}
            </span>
          </div>

          <NavLink to="/perfil" className={styles.avatarBtn} title="Meu perfil" aria-label="Ir para o perfil">
            <User size={20} color="var(--text-dark)" />
          </NavLink>

          <button type="button" className={styles.logoutBtn} onClick={handleLogout} title="Sair" aria-label="Fazer logout">
            <LogOut size={18} color="var(--green-primary)" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}