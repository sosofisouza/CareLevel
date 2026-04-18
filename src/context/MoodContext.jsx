/**
 * context/MoodContext.jsx
 * CONTEXTO DO HUMOR — estado emocional do dia, compartilhado globalmente.
 * 
 * Como usar:
 *   import { useMoodContext } from '../context/MoodContext'
 *   const { statusHoje } = useMoodContext()
 */
import { createContext, useContext, useState } from 'react'

const MoodContext = createContext(null)

export function MoodProvider({ children }) {
  const [statusHoje, setStatusHoje] = useState('Normal')

  return (
    <MoodContext.Provider value={{ statusHoje, setStatusHoje }}>
      {children}
    </MoodContext.Provider>
  )
}

export function useMoodContext() {
  return useContext(MoodContext)
}
