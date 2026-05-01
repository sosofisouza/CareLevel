# CareLevel — Projeto Unificado

Aplicação React completa com navegação integrada entre todos os módulos.

## Estrutura

```
carelevel-unified/
├── package.json              # Dependências oficiais (base: care-level-privado)
├── front_end/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx          # Ponto de entrada
│       ├── App.jsx           # Roteamento principal
│       ├── index.css         # Variáveis globais e reset
│       ├── context/          # AuthContext
│       ├── services/         # api.js (axios)
│       ├── Components/       # Componentes compartilhados
│       │   ├── NavBar/       # ← Navbar oficial (care-level-privado)
│       │   ├── Logo/
│       │   ├── HeroBanner/
│       │   ├── ServicesGrid/
│       │   ├── ServiceCard/
│       │   ├── UserContext/
│       │   ├── FormField/
│       │   ├── ProfileCard/
│       │   └── RoleGuard.jsx
│       └── pages/
│           ├── HomePage/     # Login, Home, Perfil, AdminHome
│           ├── CareMood/     # CareMood + Quiz (caremood-completo)
│           ├── Missoes/      # Missões (caremood-completo)
│           ├── Ranking/      # Ranking (RankingSofia)
│           └── Recompensas/  # Recompensas (CareLevelGustavo)
└── back_end/                 # Backend Node/Express (care-level-privado)
```

## Rotas

| Rota           | Componente          | Origem              |
|----------------|---------------------|---------------------|
| /login         | Login               | care-level-privado  |
| /home          | HomePage            | care-level-privado  |
| /perfil        | PerfilBeneficiario  | care-level-privado  |
| /caremood      | CareMoodPage        | caremood-completo   |
| /missoes       | MissoesPage         | caremood-completo   |
| /ranking       | RankingPage         | RankingSofia        |
| /recompensas   | RecompensasPage     | CareLevelGustavo    |
| /admin/home    | AdminHome           | care-level-privado  |

## Como rodar

```bash
# Instalar dependências
npm install

# Frontend (dev)
npm run frontend

# Backend
npm run backend
```
