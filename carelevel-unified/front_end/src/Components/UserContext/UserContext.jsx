import { createContext, useContext, useState } from 'react';

// Contexto global de usuário — expandir conforme backend for integrado
const UserContext = createContext(null);

const DEFAULT_USER = {
  id: null,
  name: 'Visitante',
  streak: 5,
  points: 1490,
  avatar: null,
  isAuthenticated: false,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);

  const login = (userData) => {
    setUser({ ...DEFAULT_USER, ...userData, isAuthenticated: true });
  };

  const logout = () => {
    setUser(DEFAULT_USER);
  };

  const updatePoints = (delta) => {
    setUser((prev) => ({ ...prev, points: prev.points + delta }));
  };

  const updateStreak = (streak) => {
    setUser((prev) => ({ ...prev, streak }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePoints, updateStreak }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook utilitário
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de <UserProvider>');
  }
  return context;
}