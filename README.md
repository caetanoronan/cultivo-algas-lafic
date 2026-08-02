# PGRS LAFIC

Projeto do LAFIC/UFSC com frontend principal em React, app de bancada em HTML/JS e backend Express integrado ao Notion.

## Estrutura

- `index.html`: hub de navegação entre o frontend principal e o app.
- `experimento_entressafra.html`: página principal do experimento.
- `app/`: app de bancada em HTML/JS.
- `backend/`: API Express com integração ao Notion.
- `frontend/`: frontend React + Vite + Tailwind para a navegação principal.
- `docs/`: setup, documentação de API e deploy.
- `render.yaml`: configuração de deploy do backend no Render.

## Execução local

- Frontend principal estático: abra `index.html` no navegador.
- Frontend React: entre em `frontend/`, rode `npm install` e depois `npm run dev`.
- App de bancada: abra `app/Registro_semanal_bancada.html` ou sirva via backend.
- Backend: entre em `backend/`, rode `npm install` e depois `npm start`.

## Deploy

- GitHub Pages: publique a branch `main` na raiz do repositório ou use a build do frontend React depois do `npm run build`.
- Render: use `backend/` como raiz do serviço, com `npm install` e `npm start`.

## Notion

- Banco principal: `3b0d14c78a5680ef907cf5977a6148dd`
- Variáveis necessárias: `NOTION_TOKEN` e `NOTION_DATABASE_ID`

## Observação

- O app de bancada precisa receber a URL base do backend do Render quando for publicado separadamente.
- A migração React já deixa o projeto preparado para evoluir a UI sem perder o material estático existente.