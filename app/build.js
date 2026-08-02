const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'dist');
const backendUrl = process.env.BACKEND_URL || '';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const htmlSource = fs.readFileSync(path.join(__dirname, 'Registro_semanal_bancada.html'), 'utf8');
const htmlWithConfig = htmlSource.replace(
  '<meta name="api-base-url" content="">',
  `<meta name="api-base-url" content="${backendUrl}">\n  <script>window.PGRS_API_BASE_URL = ${JSON.stringify(backendUrl)};</script>`,
);

fs.writeFileSync(path.join(outputDir, 'index.html'), htmlWithConfig, 'utf8');

const redirectHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=index.html">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro Semanal de Bancada - LAFIC</title>
</head>
<body></body>
</html>`;

fs.writeFileSync(path.join(outputDir, 'redirect.html'), redirectHtml, 'utf8');

['Registro_semanal_bancada.html'].forEach((fileName) => {
  const sourcePath = path.join(__dirname, fileName);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, path.join(outputDir, fileName));
  }
});

console.log(`App build concluído em ${outputDir}`);