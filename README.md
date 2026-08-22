# App de Bancada LAFIC

Projeto do LAFIC/UFSC com app de bancada em HTML/JS e backend Express integrado ao Notion.

## Estrutura

- `index.html`: hub de navegacao do projeto.
- `experimento_entressafra.html`: pagina principal do experimento.
- `app/Registro_semanal_bancada.html`: app de bancada. Ele e estatico e conversa com o backend oficial.
- `backend/`: unica API Express do projeto, com integracao ao Notion.
- `frontend/`: frontend React + Vite + Tailwind opcional para navegacao principal.
- `docs/`: setup, documentacao de API e deploy.
- `render.yaml`: configuracao de deploy do backend no Render.

## Execucao local

- Frontend principal estatico: abra `index.html` no navegador.
- Frontend React: entre em `frontend/`, rode `npm install` e depois `npm run dev`.
- App de bancada: abra `app/Registro_semanal_bancada.html`.
- Backend: entre em `backend/`, rode `npm install` e depois `npm start`.

## Deploy

- GitHub Pages: publique a branch `main` na raiz do repositorio para o material estatico.
- Render: publique somente `backend/` como Web Service.
- O app de bancada no Pages usa a URL publica do backend do Render para gravar no Notion.

## Notion

- Banco principal: `3b0d14c78a5680ef907cf5977a6148dd`
- Variaveis necessarias: `NOTION_TOKEN` e `NOTION_DATABASE_ID`

## Observacao

- O app de bancada precisa apenas da URL publica do backend do Render.
- O modo offline fica no proprio `app/Registro_semanal_bancada.html`, usando armazenamento local do navegador ate a API voltar.
- O frontend React fica como opcao futura; ele nao e necessario para o fluxo minimo.
- O deploy minimo fica online quando o backend estiver com o token do Notion e o Pages apontar para essa API.
