/**
 * context/AuthContext.jsx
 * CONTEXTO DE AUTENTICAÇÃO — disponível em TODO o projeto.
 * 
 * O que faz:
 *  - Armazena se o usuário está logado e seus dados básicos
 *  - Qualquer componente pode acessar sem precisar passar "props"
 * 
 * Como usar em qualquer componente:
 *   import { useAuth } from '../context/AuthContext'
 *   const { usuario, logout } = useAuth()
 * 
 * IMPORTANTE: O AuthProvider precisa estar em main.jsx (já está)
 */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null) // null = não logado

  function login(dadosUsuario) { setUsuario(dadosUsuario) }
  function logout() { setUsuario(null) }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook de atalho — use dentro de qualquer componente
export function useAuth() {
  return useContext(AuthContext)
}
