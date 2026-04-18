/**
 * main.jsx
 * PONTO DE ENTRADA da aplicação React.
 * 
 * O que faz:
 *  - Encontra o elemento <div id="root"> no index.html
 *  - "Monta" o componente App dentro dele
 *  - O BrowserRouter habilita a navegação por URLs (React Router)
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
