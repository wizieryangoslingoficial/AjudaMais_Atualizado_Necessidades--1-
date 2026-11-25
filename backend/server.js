// Ponto de entrada: carrega o .env e liga o servidor.
require("dotenv").config();
const app = require("./src/app");

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`AjudaMais rodando em http://localhost:${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
});
