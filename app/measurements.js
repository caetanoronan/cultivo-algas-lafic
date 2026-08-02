// routes/measurements.js
// Rota para o novo módulo "Bancada Semanal" do app PGRS/LAFIC.
// Segue o mesmo padrão que (presumivelmente) já existe em routes/waste.js
// — adapte os nomes de import/roteador conforme a estrutura real do seu projeto Express.

const express = require("express");
const router = express.Router();
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_MEASUREMENTS_DB_ID; // crie um novo database no Notion só para isso

// Estrutura sugerida do database no Notion (crie as colunas com estes tipos):
//   Frasco        -> Title
//   Especie       -> Select (Ulva spp. / Gracilaria sp. / Chondracanthus teedei / Petalonia fascia)
//   Tratamento    -> Select (T1 - Inverno / T2 - Transição / T3 - Verão)
//   Data Medicao  -> Date
//   Peso Umido    -> Number
//   Fv/Fm         -> Number
//   Salinidade    -> Number
//   Temperatura   -> Number
//   Observacoes   -> Text
//   Responsavel   -> Text

// GET /api/measurements — lista todas as medições, mais recentes primeiro
router.get("/measurements", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Data Medicao", direction: "descending" }],
    });

    const rows = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        flaskId: props["Frasco"]?.title?.[0]?.plain_text || "",
        especie: props["Especie"]?.select?.name || "",
        tratamento: props["Tratamento"]?.select?.name || "",
        dataMedicao: props["Data Medicao"]?.date?.start || null,
        pesoUmido: props["Peso Umido"]?.number ?? null,
        fvfm: props["Fv/Fm"]?.number ?? null,
        salinidade: props["Salinidade"]?.number ?? null,
        temperatura: props["Temperatura"]?.number ?? null,
        observacoes: props["Observacoes"]?.rich_text?.[0]?.plain_text || "",
        responsavel: props["Responsavel"]?.rich_text?.[0]?.plain_text || "",
      };
    });

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar medições no Notion:", error);
    res.status(500).json({ error: "Erro ao buscar medições" });
  }
});

// POST /api/measurements — registra uma nova medição semanal
router.post("/measurements", async (req, res) => {
  try {
    const {
      flaskId, especie, tratamento, dataMedicao,
      pesoUmido, fvfm, salinidade, temperatura,
      observacoes, responsavel,
    } = req.body;

    if (!flaskId || !especie || !tratamento || !dataMedicao) {
      return res.status(400).json({ error: "flaskId, especie, tratamento e dataMedicao são obrigatórios" });
    }

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        "Frasco": { title: [{ text: { content: flaskId } }] },
        "Especie": { select: { name: especie } },
        "Tratamento": { select: { name: tratamento } },
        "Data Medicao": { date: { start: dataMedicao } },
        ...(pesoUmido != null && { "Peso Umido": { number: pesoUmido } }),
        ...(fvfm != null && { "Fv/Fm": { number: fvfm } }),
        ...(salinidade != null && { "Salinidade": { number: salinidade } }),
        ...(temperatura != null && { "Temperatura": { number: temperatura } }),
        "Observacoes": { rich_text: [{ text: { content: observacoes || "" } }] },
        "Responsavel": { rich_text: [{ text: { content: responsavel || "" } }] },
      },
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Erro ao registrar medição no Notion:", error);
    res.status(500).json({ error: "Erro ao registrar medição" });
  }
});

module.exports = router;

// No arquivo principal do servidor (ex: server.js ou index.js), monte esta rota assim:
//   const measurementsRouter = require("./routes/measurements");
//   app.use("/api", measurementsRouter);
//
// E adicione a variável de ambiente NOTION_MEASUREMENTS_DB_ID no painel do Render
// (Environment), com o ID do novo database do Notion criado para as medições.
