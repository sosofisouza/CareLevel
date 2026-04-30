import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import ServicesGrid from '../../Components/ServicesGrid/ServicesGrid';
import NavBar from "../../Components/NavBar/NavBar";
import OnboardingModal, { shouldShowOnboarding } from '../../Components/OnboardingModal/OnboardingModal';

import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(() => shouldShowOnboarding(user?.id));

  const handleNavigate = (serviceId) => {
    const routes = {
      missoes: '/missoes',
      caremood: '/caremood',
      ranking: '/ranking',
      recompensas: '/recompensas',
      conquistas: '/conquistas',
      pontos: '/carepoints',
    };
    if (routes[serviceId]) navigate(routes[serviceId]);
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <HeroBanner />
      <ServicesGrid onNavigate={handleNavigate} />
      {showOnboarding && (
        <OnboardingModal onDone={() => setShowOnboarding(false)} />
      )}
    </main>
  );
}