<<<<<<< HEAD
# CareLevel — Estrutura React

## Como rodar
```bash
npm install
npm run dev
```

## Estrutura de pastas

```
src/
├── main.jsx              ← PONTO DE ENTRADA. Não mexer muito aqui.
├── App.jsx               ← ROTAS. Adicione novas páginas aqui.
│
├── pages/                ← UMA PASTA POR PÁGINA (aba do site)
│   ├── Home.jsx
│   ├── Missoes/index.jsx
│   ├── CareMood/index.jsx
│   ├── Ranking/index.jsx
│   ├── Recompensas/index.jsx
│   ├── Conquistas/index.jsx
│   └── CarePoints/index.jsx
│
├── components/           ← BLOCOS VISUAIS REUTILIZÁVEIS
│   ├── Navbar/           ← Menu de navegação + Layout global
│   ├── MissaoCard/       ← Card de uma missão individual
│   ├── RankingItem/      ← Linha do ranking
│   ├── Podium/           ← Top 3 do ranking
│   ├── MoodBoard/        ← Bolinhas de humor da semana
│   ├── Button/           ← Botão padrão
│   └── Badge/            ← Etiquetas/conquistas
│
├── hooks/                ← LÓGICA DE DADOS (separada do visual)
│   ├── useMissoes.js
│   ├── useRanking.js
│   └── useMood.js
│
├── services/             ← COMUNICAÇÃO COM O BACKEND (API)
│   ├── api.js            ← Configuração central
│   ├── missaoService.js
│   ├── rankingService.js
│   └── moodService.js
│
├── context/              ← ESTADO GLOBAL (compartilhado entre páginas)
│   ├── AuthContext.jsx   ← Usuário logado
│   ├── UserContext.jsx   ← Pontos, streak, nível
│   └── MoodContext.jsx   ← Humor do dia
│
├── styles/               ← CSS GLOBAL
│   ├── global.css        ← Variáveis de cor, reset, tipografia
│   └── variaveis.css     ← Espaçamentos, breakpoints
│
└── assets/
    └── images/           ← Imagens, ícones, logos
```

## Como adicionar uma nova aba

1. Crie a pasta e o arquivo: `src/pages/NovaPagina/index.jsx`
2. Em `App.jsx`, importe e registre a rota:
   ```jsx
   import NovaPagina from './pages/NovaPagina'
   <Route path="/nova-pagina" element={<NovaPagina />} />
   ```
3. Em `Navbar.jsx`, adicione o link:
   ```jsx
   <NavLink to="/nova-pagina">Nova Página</NavLink>
   ```

## Regras simples para entender o projeto

| Quer fazer...                  | Vai em...          |
|--------------------------------|--------------------|
| Nova página/aba                | `pages/`           |
| Bloco visual que se repete     | `components/`      |
| Buscar dados da API            | `services/`        |
| Lógica de estado de uma página | `hooks/`           |
| Dado compartilhado entre abas  | `context/`         |
| Mudar cor ou fonte do site     | `styles/global.css`|
=======
# CarePlusWeb
>>>>>>> bcbd260790a71897bf17b10d30a645e322b8a45c
