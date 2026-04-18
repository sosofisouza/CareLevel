/**
 * App.jsx
 * GERENCIADOR DE ROTAS da aplicação.
 * 
 * O que faz:
 *  - Define qual PÁGINA aparece para cada URL
 *  - Envolve tudo com o Layout (Navbar + estrutura visual)
 *  - Para adicionar uma nova aba: importe a página e adicione um <Route>
 * 
 * Como adicionar nova aba:
 *  1. Crie o arquivo em src/pages/NomeDaPagina/index.jsx
 *  2. Importe aqui: import NomeDaPagina from './pages/NomeDaPagina'
 *  3. Adicione: <Route path="/nome-da-pagina" element={<NomeDaPagina />} />
 *  4. Adicione o link no componente Navbar
 */
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Navbar/Layout'

import Home        from './pages/Home'
import Missoes     from './pages/Missoes'
import CareMood    from './pages/CareMood'
import Ranking     from './pages/Ranking'
import Recompensas from './pages/Recompensas'
import Conquistas  from './pages/Conquistas'
import CarePoints  from './pages/CarePoints'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"            element={<Home />}        />
        <Route path="/missoes"     element={<Missoes />}     />
        <Route path="/caremood"    element={<CareMood />}    />
        <Route path="/ranking"     element={<Ranking />}     />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/conquistas"  element={<Conquistas />}  />
        <Route path="/carepoints"  element={<CarePoints />}  />
      </Route>
    </Routes>
  )
}
