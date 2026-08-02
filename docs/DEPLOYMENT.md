# Deploy

## Render

1. Antes de criar o serviço no Render, confirme que a integração do Notion já existe e que o database correto foi criado.
2. Crie um Web Service apontando para `backend/` no GitHub repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Defina `NOTION_TOKEN`, `NOTION_DATABASE_ID` e, se necessário, `CORS_ORIGIN`.
6. O app só passa a gravar no Notion depois que essas variáveis estiverem salvas no painel do Render.

## GitHub Pages

1. Publique a branch `main`.
2. Use a raiz do repositório.
3. O `index.html` funciona como hub entre o frontend principal e o app.

## Frontend

O frontend React pode apontar para a API do Render via `VITE_API_BASE_URL`.

## Quando criar cada coisa

1. Crie o database do Notion primeiro.
2. Depois crie a integração e copie o token.
3. Em seguida crie o serviço no Render, porque ele vai precisar do token e do database ID já prontos.
4. Por fim publique o frontend no GitHub Pages ou em outro host estático e aponte para a URL do Render.