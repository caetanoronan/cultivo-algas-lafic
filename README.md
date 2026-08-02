# Cultivo de Macroalgas Nativas na Entressafra

Projeto do LAFIC/UFSC com uma página principal em HTML, gráficos e desenhos experimentais, além de um backend em Node.js para integração com o Notion.

## Estrutura

- `index.html`: hub de entrada do projeto, com links para o frontend principal e para o app de bancada.
- `experimento_entressafra.html`: página completa do experimento com seções e ativos.
- `Graficos/`, `Ciclo_vida/`, `desenho_experimento/`: imagens usadas na página.
- `app/`: backend com `server.js` e `package.json`.
- CSVs na raiz: bases usadas para gerar os gráficos e análises.

## Como executar o frontend

Abra `index.html` no navegador ou publique a raiz do repositório no GitHub Pages.

## Como publicar no GitHub Pages

1. Deixe o repositório público.
2. No GitHub, abra `Settings` > `Pages`.
3. Em `Build and deployment`, selecione `Deploy from a branch`.
4. Escolha a branch `main` e a pasta `/ (root)`.

O arquivo `index.html` apresenta os dois acessos principais: o experimento e o app.

## Como executar o backend

1. Entre na pasta `app/`.
2. Instale as dependências com `npm install`.
3. Defina as variáveis de ambiente:
   - `NOTION_DATABASE_ID=3b0d14c78a5680ef907cf5977a6148dd`
   - `NOTION_TOKEN=seu_token_secret_do_notion`
4. Inicie com `npm start`.

## Deploy no Render

Configure um Web Service Node com:

- Build Command: `npm install`
- Start Command: `npm start`
- Variáveis de ambiente: `NOTION_DATABASE_ID` e `NOTION_TOKEN`

Se preferir deploy automático, use o arquivo `render.yaml` da raiz do projeto. Ele aponta para a pasta `app/`.

## Observações

- Não commit o token do Notion no repositório.
- Mantenha os caminhos dos arquivos exatamente como estão, porque o HTML referencia as pastas com capitalização específica.