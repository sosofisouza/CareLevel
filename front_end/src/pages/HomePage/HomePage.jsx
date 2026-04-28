import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import ServicesGrid from '../../Components/ServicesGrid/ServicesGrid';
import NavBar from "../../Components/NavBar/NavBar"

import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (serviceId) => {
    const routes = {
      missoes: '/missoes',
      caremood: '/caremood',
      ranking: '/ranking',
      recompensas: '/recompensas',
      conquistas: '/conquistas',
      pontos: '/pontos',
    };
    if (routes[serviceId]) navigate(routes[serviceId]);
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <HeroBanner />
      <ServicesGrid onNavigate={handleNavigate} />
    </main>
  );
}