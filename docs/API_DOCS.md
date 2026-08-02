# API Docs

## `GET /api/health`

Retorna o status do servidor.

## `GET /api/measurements`

Lista medições registradas no Notion.

## `POST /api/measurements`

Registra uma nova medição.

### Corpo esperado

- `flaskId`
- `dataMedicao`
- `especie`
- `tratamento`
- `pesoUmido`
- `fvfm`
- `salinidade`
- `temperatura`
- `observacoes`
- `responsavel`