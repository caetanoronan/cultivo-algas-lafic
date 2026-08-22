# Deploy

## Render

1. Antes de criar o servico no Render, confirme que a integracao do Notion ja existe e que o database correto foi criado.
2. Crie apenas o Web Service apontando para `backend/` no GitHub repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Defina `NOTION_TOKEN`, `NOTION_DATABASE_ID` e `CORS_ORIGIN`.
   - Exemplo de `CORS_ORIGIN`: `https://caetanoronan.github.io`
6. O app so passa a gravar no Notion depois que essas variaveis estiverem salvas no painel do Render.

## App de Bancada

1. Publique o app de bancada no GitHub Pages, dentro da pasta `app/`.
2. O arquivo `app/Registro_semanal_bancada.html` ja aponta para o backend do Render por padrao.
3. O app chama somente a API publica de `backend/` para gravar e listar medicoes no Notion.
4. O modo offline fica dentro do proprio HTML: os registros pendentes sao guardados no navegador e sincronizados quando a API voltar.

## GitHub Pages

1. Publique a branch `main`.
2. Use a raiz do repositorio.
3. O `index.html` funciona como hub entre o experimento e o app de bancada.
4. Se preferir, publique o conteudo estatico do app e do experimento no mesmo Pages.

## Frontend

O frontend React e opcional no fluxo minimo e tambem aponta para a API do Render via `VITE_API_BASE_URL`.

## Quando criar cada coisa

1. Crie o database do Notion primeiro.
2. Depois crie a integracao e copie o token.
3. Em seguida crie o servico backend no Render, porque ele vai precisar do token e do database ID ja prontos.
4. Depois publique o app e o experimento no GitHub Pages.
5. O HTML do app ja usa o backend do Render como fallback, entao o GitHub Pages tambem consegue gravar no Notion quando o backend estiver online.
