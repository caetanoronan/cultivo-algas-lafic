const express = require('express');
const { createMeasurement, listMeasurements } = require('../services/notionService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const measurements = await listMeasurements();
    res.json(measurements);
  } catch (error) {
    console.error('Erro ao buscar medições no Notion:', error.body || error);
    res.status(500).json({ error: 'Erro ao buscar medições.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      flaskId,
      dataMedicao,
      especie,
      tratamento,
      pesoUmido,
      fvfm,
      salinidade,
      temperatura,
      observacoes,
      responsavel,
    } = req.body;

    if (!flaskId || !dataMedicao || !especie || !tratamento || pesoUmido == null) {
      return res.status(400).json({
        error: 'flaskId, dataMedicao, especie, tratamento e pesoUmido são obrigatórios.',
      });
    }

    const createdPage = await createMeasurement({
      flaskId,
      dataMedicao,
      especie,
      tratamento,
      pesoUmido,
      fvfm,
      salinidade,
      temperatura,
      observacoes,
      responsavel,
    });

    res.status(201).json({ success: true, id: createdPage.id });
  } catch (error) {
    console.error('Erro ao registrar medição no Notion:', error.body || error);
    res.status(500).json({ error: 'Erro ao registrar medição.' });
  }
});

module.exports = router;