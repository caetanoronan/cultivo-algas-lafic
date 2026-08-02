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

- GitHub Pages: publique a branch `main` na raiz do repositório para o material estático.
- Render: publique somente `backend/` como Web Service.
- O app de bancada no Pages usa a URL pública do backend do Render para gravar no Notion.

## Notion

- Banco principal: `3b0d14c78a5680ef907cf5977a6148dd`
- Variáveis necessárias: `NOTION_TOKEN` e `NOTION_DATABASE_ID`

## Observação

- O app de bancada precisa apenas da URL pública do backend do Render.
- O frontend React fica como opção futura; ele não é necessário para o fluxo mínimo.
- O deploy mínimo fica online quando o backend estiver com o token do Notion e o Pages apontar para essa API.