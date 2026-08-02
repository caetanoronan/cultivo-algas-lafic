function toMeasurementResponse(page) {
  const properties = page.properties;

  return {
    id: page.id,
    flaskId: properties['Código do Frasco']?.title?.[0]?.plain_text || '',
    dataMedicao: properties['Data da Medição']?.date?.start || null,
    especie: properties['Espécie']?.select?.name || '',
    tratamento: properties['Tratamento']?.select?.name || '',
    pesoUmido: properties['Peso Úmido (g)']?.number ?? null,
    fvfm: properties['Fv/Fm']?.number ?? null,
    salinidade: properties['Salinidade']?.number ?? null,
    temperatura: properties['Temperatura']?.number ?? null,
    observacoes: properties['Observações']?.rich_text?.[0]?.plain_text || '',
    responsavel: properties['Responsável']?.rich_text?.[0]?.plain_text || '',
  };
}

function toMeasurementPageProperties(measurement) {
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
  } = measurement;

  return {
    'Código do Frasco': {
      title: [{ text: { content: flaskId } }],
    },
    'Data da Medição': {
      date: { start: dataMedicao },
    },
    'Espécie': {
      select: { name: especie },
    },
    'Tratamento': {
      select: { name: tratamento },
    },
    'Peso Úmido (g)': {
      number: Number(pesoUmido),
    },
    'Fv/Fm': {
      number: fvfm === '' || fvfm == null ? null : Number(fvfm),
    },
    'Salinidade': {
      number: salinidade === '' || salinidade == null ? null : Number(salinidade),
    },
    'Temperatura': {
      number: temperatura === '' || temperatura == null ? null : Number(temperatura),
    },
    'Observações': {
      rich_text: [{ text: { content: observacoes || '' } }],
    },
    'Responsável': {
      rich_text: [{ text: { content: responsavel || '' } }],
    },
  };
}

module.exports = {
  toMeasurementResponse,
  toMeasurementPageProperties,
};