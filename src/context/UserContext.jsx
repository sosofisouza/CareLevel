/**
 * context/UserContext.jsx
 * CONTEXTO DO USUÁRIO — pontos, streak, nível disponíveis globalmente.
 * 
 * Como usar:
 *   import { useUser } from '../context/UserContext'
 *   const { pontos, streak } = useUser()
 */
import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [pontos, setPontos]   = useState(1490)
  const [streak, setStreak]   = useState(5)
  const [nivel, setNivel]     = useState(10)

  return (
    <UserContext.Provider value={{ pontos, streak, nivel, setPontos }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
