require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');

const app = express();

// Configurações de Segurança e JSON
app.use(cors()); // Permite que o Vercel converse com o Render
app.use(express.json());
app.use(express.static(__dirname));

// Inicializa o cliente do Notion com a chave secreta
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

// Rota de Health Check (para o indicador verde no seu HTML)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor LAFIC operante.' });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Registro_semanal_bancada.html');
});

// Rota POST: Recebe dados do frontend e envia para o Notion
app.post('/api/measurements', async (req, res) => {
    try {
        const { frasco, data, especie, tratamento, peso, fvfm, salinidade, temperatura, observacoes, responsavel } = req.body;

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                // 'Código do Frasco' deve ser do tipo "Title" (Aa) no Notion
                'Código do Frasco': { 
                    title: [ { text: { content: frasco } } ] 
                },
                // 'Data da Medição' deve ser do tipo "Date" no Notion
                'Data da Medição': { 
                    date: { start: data } 
                },
                // 'Espécie' e 'Tratamento' devem ser do tipo "Select" ou "Status" no Notion
                'Espécie': { 
                    select: { name: especie } 
                },
                'Tratamento': { 
                    select: { name: tratamento } 
                },
                // 'Peso Úmido (g)' deve ser do tipo "Number"
                'Peso Úmido (g)': { 
                    number: parseFloat(peso) 
                },
                'Fv/Fm': { 
                    number: fvfm ? parseFloat(fvfm) : null 
                },
                'Salinidade': { 
                    number: salinidade ? parseFloat(salinidade) : null 
                },
                'Temperatura': { 
                    number: temperatura ? parseFloat(temperatura) : null 
                },
                // 'Observações' e 'Responsável' devem ser do tipo "Text" (Rich Text)
                'Observações': { 
                    rich_text: [ { text: { content: observacoes || "" } } ] 
                },
                'Responsável': { 
                    rich_text: [ { text: { content: responsavel || "" } } ] 
                }
            }
        });

        res.status(201).json({ message: 'Sucesso! Medição registrada.', id: response.id });
    } catch (error) {
        console.error('Erro na API do Notion:', error.body || error);
        res.status(500).json({ error: 'Erro ao registrar no banco de dados.' });
    }
});

// Define a porta dinâmica (necessário para o Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});