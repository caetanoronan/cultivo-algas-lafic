const PROPERTIES = {
  experimento: 'Experimento',
  flaskId: 'C\u00f3digo do Frasco',
  dataMedicao: 'Data da Medi\u00e7\u00e3o',
  especie: 'Esp\u00e9cie',
  tratamento: 'Tratamento',
  pesoUmido: 'Peso \u00damido (g)',
  fvfm: 'Fv/Fm',
  salinidade: 'Salinidade',
  temperatura: 'Temperatura',
  observacoes: 'Observa\u00e7\u00f5es',
  responsavel: 'Respons\u00e1vel',
};

function toMeasurementResponse(page) {
  const properties = page.properties;

  return {
    id: page.id,
    experimento: properties[PROPERTIES.experimento]?.select?.name || '',
    flaskId: properties[PROPERTIES.flaskId]?.title?.[0]?.plain_text || '',
    dataMedicao: properties[PROPERTIES.dataMedicao]?.date?.start || null,
    especie: properties[PROPERTIES.especie]?.select?.name || '',
    tratamento: properties[PROPERTIES.tratamento]?.select?.name || '',
    pesoUmido: properties[PROPERTIES.pesoUmido]?.number ?? null,
    fvfm: properties[PROPERTIES.fvfm]?.number ?? null,
    salinidade: properties[PROPERTIES.salinidade]?.number ?? null,
    temperatura: properties[PROPERTIES.temperatura]?.number ?? null,
    observacoes: properties[PROPERTIES.observacoes]?.rich_text?.[0]?.plain_text || '',
    responsavel: properties[PROPERTIES.responsavel]?.rich_text?.[0]?.plain_text || '',
  };
}

function toMeasurementPageProperties(measurement) {
  const {
    flaskId,
    experimento = 'Bancada padr\u00e3o LAFIC',
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
    [PROPERTIES.experimento]: {
      select: { name: experimento },
    },
    [PROPERTIES.flaskId]: {
      title: [{ text: { content: flaskId } }],
    },
    [PROPERTIES.dataMedicao]: {
      date: { start: dataMedicao },
    },
    [PROPERTIES.especie]: {
      select: { name: especie },
    },
    [PROPERTIES.tratamento]: {
      select: { name: tratamento },
    },
    [PROPERTIES.pesoUmido]: {
      number: Number(pesoUmido),
    },
    [PROPERTIES.fvfm]: {
      number: fvfm === '' || fvfm == null ? null : Number(fvfm),
    },
    [PROPERTIES.salinidade]: {
      number: salinidade === '' || salinidade == null ? null : Number(salinidade),
    },
    [PROPERTIES.temperatura]: {
      number: temperatura === '' || temperatura == null ? null : Number(temperatura),
    },
    [PROPERTIES.observacoes]: {
      rich_text: [{ text: { content: observacoes || '' } }],
    },
    [PROPERTIES.responsavel]: {
      rich_text: [{ text: { content: responsavel || '' } }],
    },
  };
}

module.exports = {
  toMeasurementResponse,
  toMeasurementPageProperties,
};
