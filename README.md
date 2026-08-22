# App de Bancada LAFIC

Sistema simples para registrar medicoes de bancada do LAFIC/UFSC e enviar os dados para uma base do Notion.

O fluxo atual esta funcionando assim:

```text
App de bancada no GitHub Pages -> Backend no Render -> Banco de dados no Notion
```

O app tambem tem modo offline: quando a API nao responde, a medicao fica salva no navegador e pode ser sincronizada depois.

## Estado atual

- App de bancada: `app/Registro_semanal_bancada.html`
- Backend oficial: `backend/`
- API publica: `https://app-de-bancada-lafic.onrender.com`
- Banco Notion: `3b0d14c78a5680ef907cf5977a6148dd`
- Deploy do backend: Render Web Service
- Publicacao estatica: GitHub Pages

## Estrutura do repositorio

- `app/Registro_semanal_bancada.html`: interface principal usada na bancada.
- `backend/`: API Express que lista e cria medicoes no Notion.
- `backend/index.js`: entrada do servidor.
- `backend/routes/measurements.js`: rotas `GET` e `POST` de medicoes.
- `backend/models/measurement.js`: mapeamento entre os campos do app e as colunas do Notion.
- `backend/services/notionService.js`: chamadas para a API do Notion.
- `docs/`: documentacao complementar de API e deploy.
- `frontend/`: frontend React opcional, mantido como base futura.
- `index.html`: hub estatico do projeto.
- `experimento_entressafra.html`: pagina estatica do experimento.
- `render.yaml`: configuracao do servico no Render.

Arquivos antigos duplicados dentro de `app/` foram removidos. O unico backend oficial agora e `backend/`.

## Como usar na bancada

1. Abra o app publicado no GitHub Pages.
2. Preencha os campos obrigatorios.
3. Envie a medicao.
4. Se a API estiver conectada, a linha entra direto no Notion.
5. Se estiver offline, a linha fica salva no navegador.
6. Quando a conexao voltar, clique em `Sincronizar pendentes agora`.

## Campos atuais do Notion

A base do Notion precisa ter exatamente estas colunas:

| Coluna | Tipo no Notion |
| --- | --- |
| `Experimento` | Selecao |
| `Código do Frasco` | Titulo |
| `Data da Medição` | Data |
| `Espécie` | Selecao |
| `Tratamento` | Selecao |
| `Peso Úmido (g)` | Numero |
| `Fv/Fm` | Numero |
| `Salinidade` | Numero |
| `Temperatura` | Numero |
| `Observações` | Texto |
| `Responsável` | Texto |

Observacao: no codigo, os nomes sao enviados ao Notion com acentos corretos usando escapes Unicode para evitar problemas de codificacao. No Notion, os nomes visiveis devem ser exatamente:

```text
Experimento
Código do Frasco
Data da Medição
Espécie
Tratamento
Peso Úmido (g)
Fv/Fm
Salinidade
Temperatura
Observações
Responsável
```

## Variaveis de ambiente do backend

No Render, configure:

```env
NOTION_TOKEN=token_da_integracao_do_notion
NOTION_DATABASE_ID=3b0d14c78a5680ef907cf5977a6148dd
CORS_ORIGIN=https://caetanoronan.github.io
```

Nunca coloque `NOTION_TOKEN` no codigo, no README ou em commits.

## Rodar localmente

Backend:

```bash
cd backend
npm install
npm start
```

App de bancada:

```text
Abra app/Registro_semanal_bancada.html no navegador.
```

Frontend React opcional:

```bash
cd frontend
npm install
npm run dev
```

## Testar a API

Health check:

```bash
curl https://app-de-bancada-lafic.onrender.com/api/health
```

Listar medicoes:

```bash
curl https://app-de-bancada-lafic.onrender.com/api/measurements
```

Resposta esperada quando o banco esta vazio:

```json
[]
```

## Deploy

### Render

O backend deve ser criado como Web Service, nao como Static Site.

Configuracao:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Depois de cada push importante:

```text
Manual Deploy -> Deploy latest commit
```

### GitHub Pages

Publique a branch `main` a partir da raiz do repositorio. O app de bancada usa a URL publica do Render por padrao.

## Problemas comuns

### O app mostra modo local/offline

Possiveis causas:

- GitHub Pages ainda esta com cache antigo.
- Render ainda nao redeployou o ultimo commit.
- CORS nao esta liberando `https://caetanoronan.github.io`.
- A API do Render esta dormindo e precisa de alguns segundos para acordar.

Teste:

```bash
curl -i -H "Origin: https://caetanoronan.github.io" https://app-de-bancada-lafic.onrender.com/api/measurements
```

A resposta precisa conter:

```text
access-control-allow-origin: https://caetanoronan.github.io
```

### Erro do Notion dizendo que uma coluna espera outro tipo

Exemplo:

```text
Observacoes is expected to be number
```

Isso significa que a coluna esta com tipo errado no Notion. Ajuste o tipo da propriedade na tabela.

### Medicoes pendentes nao sincronizam

1. Veja os logs do Render.
2. Confira se os nomes das colunas do Notion batem com `backend/models/measurement.js`.
3. Confira se os tipos das colunas estao corretos.
4. Depois clique em `Sincronizar pendentes agora`.

## Estrategia para novos experimentos

Para um experimento novo, nao e ideal ficar editando o app principal toda vez que muda um detalhe. A melhor estrategia e separar o que e fixo do que varia.

### O que deve ser fixo

Estes campos devem continuar em quase todo experimento:

- Identificador da amostra ou frasco.
- Data da medicao.
- Experimento.
- Especie.
- Tratamento.
- Responsavel.
- Observacoes.

### O que pode variar

Campos como estes podem mudar conforme o desenho experimental:

- Peso umido.
- Peso seco.
- Fv/Fm.
- Salinidade.
- Temperatura.
- Numero de talos.
- Comprimento.
- Area.
- Sobrevivencia.
- Fertilidade.

### Recomendacao pratica

Para o proximo passo, eu recomendo criar um campo `Experimento` e manter uma base mais flexivel.

Exemplo:

```text
Experimento
Codigo do Frasco
Data da Medicao
Especie
Tratamento
Peso Umido (g)
Peso Seco (g)
Fv/Fm
Salinidade
Temperatura
Observacoes
Responsavel
```

Quando um experimento nao usar um campo, ele fica vazio. Isso e mais simples do que criar um app completamente novo para cada estudo.

### Quando criar uma base separada no Notion

Crie uma nova base apenas se o experimento tiver uma estrutura muito diferente, por exemplo:

- Outro organismo com metricas totalmente diferentes.
- Outra periodicidade e outro fluxo de coleta.
- Dados que nao devem se misturar de jeito nenhum.
- Necessidade de permissoes separadas.

### Caso: experimento com uma especie apenas

Se o experimento usa apenas uma especie, ha duas boas opcoes:

1. Manter o campo `Especie` preenchido automaticamente no app.
2. Remover o campo visualmente do formulario, mas continuar enviando o valor fixo para o backend.

Eu prefiro a segunda opcao para uso em bancada: menos clique, menos erro.

### Caso: 1, 2 ou 6 especies

Para poucas especies, use uma lista de selecao no formulario.

Para muitas especies ou especies que mudam com frequencia, o melhor e o backend fornecer uma configuracao do experimento, por exemplo:

```json
{
  "experimento": "Inverno 2026",
  "especies": ["Ulva sp.", "Gracilaria sp."],
  "campos": ["pesoUmido", "pesoSeco", "fvfm", "temperatura"]
}
```

Assim o app monta o formulario conforme o experimento.

### Caso: adicionar peso seco e retirar salinidade

Boa estrategia:

- Adicionar `Peso Seco (g)` no Notion como numero.
- Adicionar `pesoSeco` no backend.
- Adicionar o campo no formulario.
- Ocultar `Salinidade` no formulario para esse experimento.
- Manter `Salinidade` no banco, vazia, se ela ainda for util em outros experimentos.

Eu nao removeria `Salinidade` do banco principal se outros experimentos usam esse dado.

### Caso: outro tipo de tratamento

Nao prenda o campo `Tratamento` a uma lista unica para todos os experimentos. O ideal e que cada experimento tenha seus tratamentos:

```text
Experimento: Luz 2026
Tratamentos: Controle, Baixa luz, Media luz, Alta luz

Experimento: Nutrientes 2026
Tratamentos: Controle, N baixo, N alto, P baixo, P alto
```

No curto prazo, da para editar as opcoes no HTML. No medio prazo, o melhor e ter um arquivo ou rota de configuracao para cada experimento.

## Direcao recomendada

Minha recomendacao para evoluir sem quebrar o que ja funciona:

1. Manter o app atual funcionando como versao estavel.
2. Adicionar a coluna `Experimento` no Notion.
3. Criar suporte a `Peso Seco (g)`.
4. Transformar `Especie`, `Tratamento` e campos visiveis em configuracao por experimento.
5. So depois disso pensar em migrar o app para React, se a interface comecar a ficar complexa.

Essa abordagem evita criar clones para cada experimento e mantem todos os dados em uma estrutura comparavel.
