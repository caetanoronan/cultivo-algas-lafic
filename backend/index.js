require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const measurementsRoutes = require('./routes/measurements');

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map((origin) => origin.trim()) }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'App de Bancada LAFIC API',
    status: 'running',
    endpoints: ['/api/health', '/api/measurements'],
  });
});

app.use('/api', healthRoutes);
app.use('/api/measurements', measurementsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
