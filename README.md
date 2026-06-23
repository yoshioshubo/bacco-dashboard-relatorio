# BACCO Dashboard — Relatório Executivo

Dashboard profissional de vendas do restaurante BACCO (Maio 2026) com análise Pareto, gráficos interativos e dados detalhados.

## Features

✅ **Visão Executiva** — KPIs de faturamento total, por canal (Restaurante, Room Service, Eventos)  
✅ **Análise Pareto** — Identificação dos 20% de produtos que geram 80% da receita  
✅ **Gráficos Interativos** — Chart.js com visualizações de evolução diária, distribuição por PDV, ranking de grupos  
✅ **Tabelas Detalhadas** — Eventos, produtos top 20, grupos, dias de pico, consumo interno  
✅ **Design Profissional** — Dark theme com paleta gold/purple/blue, responsivo  
✅ **Acessível via Internet** — Servido por Express + Railway deployment automático  

## Tech Stack

- **Frontend**: HTML5 + CSS3 + Chart.js 4.4.0
- **Backend**: Node.js + Express.js
- **Hospedagem**: Railway.app (CI/CD automático via GitHub)
- **Data**: JSON estático (persistente)

## Project Structure

```
bacco-dashboard-relatorio/
├── server.js              # Express server (porta 3000)
├── package.json          # Dependências (express, cors)
├── public/
│   └── index.html        # Dashboard completo (1200+ linhas)
├── railway.json          # Config Railway.app
├── nixpacks.toml         # Build config (Node.js + npm)
└── .gitignore
```

## Local Development

### Instalação

```bash
git clone https://github.com/yoshioshubo/bacco-dashboard-relatorio.git
cd bacco-dashboard-relatorio
npm install
```

### Executar Localmente

```bash
npm start
```

Acesse: **http://localhost:3000**

## Deploy no Railway

### Pré-requisitos
- Conta GitHub (repositório públic)
- Conta Railway.app (https://railway.app)

### Passos

1. **Criar repositório GitHub**
   ```bash
   git remote add origin https://github.com/seu-usuario/bacco-dashboard-relatorio.git
   git branch -M main
   git push -u origin main
   ```

2. **Conectar ao Railway**
   - Acesse https://railway.app
   - Clique "New Project"
   - Selecione "Deploy from GitHub"
   - Authorize GitHub e selecione `bacco-dashboard-relatorio`
   - Railway detectará automaticamente `package.json` e `railway.json`
   - Será gerada uma URL como: `https://bacco-dashboard-relatorio-production.up.railway.app`

3. **Deploy Automático**
   - Cada `git push` para `main` dispara novo build automaticamente
   - Logs disponíveis no dashboard Railway em "Deployments"

## Dados

O dashboard utiliza dados estáticos codificados em `public/index.html`:

- **Faturamento Total**: R$ 151.085 (Maio 2026)
- **Eventos**: 16 eventos, R$ 59.212
- **Restaurante**: R$ 68.588
- **Room Service**: R$ 23.285
- **Dias operacionais**: 31 | Média diária: R$ 4.873

## Customização

### Atualizar Dados

Edite os arrays no final de `public/index.html`:

```javascript
// Dados diários (linhas 695-707)
const byDate = [
  {date:'01/05',rev:1699.03*ajuste},
  ...
];

// Grupos de produtos (linhas 713-735)
const byGroup = [
  {group:'Carnes',rev:11345.82*AJUSTE_BRUTO,qty:182.6},
  ...
];

// Eventos (linhas 1119-1136)
const eventos = [
  { desc: 'REUNIÃO GEOVANNA', data: '04/05', ... },
  ...
];
```

## URLs

- **Local**: `http://localhost:3000`
- **Produção**: `https://bacco-dashboard-relatorio.up.railway.app` (após deploy)

## Suporte

Para modificações ou troubleshooting, verifique:
- Logs do servidor: `npm start` e observe saída
- Logs Railway: https://railway.app > project > deployments
- Erros do browser: F12 > Console

---

**Desenvolvido**: Junho 2026  
**Autor**: Yoshio Shubo  
**Restaurante**: BACCO — Juiz de Fora LTDA
