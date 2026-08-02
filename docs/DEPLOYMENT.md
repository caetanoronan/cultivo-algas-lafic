# Deploy

## Render

1. Antes de criar os serviços no Render, confirme que a integração do Notion já existe e que o database correto foi criado.
2. Crie o Web Service apontando para `backend/` no GitHub repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Defina `NOTION_TOKEN`, `NOTION_DATABASE_ID` e `CORS_ORIGIN`.
6. Crie também o Static Site apontando para `frontend/`.
7. Build Command do frontend: `npm install && npm run build`
8. Publish Directory do frontend: `dist`
9. Defina `VITE_API_BASE_URL` com a URL pública do backend do Render.
10. O app só passa a gravar no Notion depois que essas variáveis estiverem salvas no painel do Render.

## App de Bancada

1. Crie um terceiro Static Site apontando para `app/`.
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. Defina `BACKEND_URL` com a URL pública do backend do Render.
5. O build gera o `index.html` da bancada já com a API do backend embutida.
6. Esse app continua chamando a API pública do backend para gravar no Notion.

## GitHub Pages

1. Publique a branch `main`.
2. Use a raiz do repositório.
3. O `index.html` funciona como hub entre o frontend principal e o app.

## Frontend

O frontend React aponta para a API do Render via `VITE_API_BASE_URL`.

## Quando criar cada coisa

1. Crie o database do Notion primeiro.
2. Depois crie a integração e copie o token.
3. Em seguida crie o serviço backend no Render, porque ele vai precisar do token e do database ID já prontos.
4. Depois crie o frontend estático no Render e aponte para a URL pública do backend.
5. Depois crie o app de bancada estático no Render.
6. Se preferir, publique o material estático no GitHub Pages e mantenha o backend no Render.