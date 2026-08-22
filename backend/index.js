require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const measurementsRoutes = require('./routes/measurements');

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || '*';
const allowedOrigins = corsOrigin
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (corsOrigin === '*' || !origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
}));
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
