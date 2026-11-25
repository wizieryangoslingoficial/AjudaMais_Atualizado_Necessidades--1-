// Configuração do Express: segurança, CORS, JSON, arquivos estáticos e rotas.
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Permite scripts/estilos inline e fontes externas do Google Fonts
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(",") : true,
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));

// Rotas da API REST (/api/...)
app.use("/api", routes);

// Servir o Front-end integrado diretamente pelo Express
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// Fallback para SPA / páginas HTML caso acesse rotas diretas sem extensão
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use("/api/*", notFound);
app.use(errorHandler);

module.exports = app;
