# Deploy

## Render

1. Antes de criar o serviço no Render, confirme que a integração do Notion já existe e que o database correto foi criado.
2. Crie apenas o Web Service apontando para `backend/` no GitHub repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Defina `NOTION_TOKEN`, `NOTION_DATABASE_ID` e `CORS_ORIGIN`.
	- Exemplo de `CORS_ORIGIN`: `https://caetanoronan.github.io`
6. O app só passa a gravar no Notion depois que essas variáveis estiverem salvas no painel do Render.

## App de Bancada

1. Publique o app de bancada no GitHub Pages, dentro da pasta `app/`.
2. O arquivo `app/Registro_semanal_bancada.html` já aponta para o backend do Render por padrão.
3. O app continua chamando a API pública do backend para gravar no Notion.

## GitHub Pages

1. Publique a branch `main`.
2. Use a raiz do repositório.
3. O `index.html` funciona como hub entre o frontend principal e o app.
4. Se preferir, publique o conteúdo estático do app e do experimento no mesmo Pages.

## Frontend

O frontend React é opcional no fluxo mínimo e também aponta para a API do Render via `VITE_API_BASE_URL`.

## Quando criar cada coisa

1. Crie o database do Notion primeiro.
2. Depois crie a integração e copie o token.
3. Em seguida crie o serviço backend no Render, porque ele vai precisar do token e do database ID já prontos.
4. Depois publique o app e o experimento no GitHub Pages.
5. O HTML do app já usa o backend do Render como fallback, então o GitHub Pages também consegue gravar no Notion quando o backend estiver online.