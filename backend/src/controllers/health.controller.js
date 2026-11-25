// Recebe a requisição e devolve a resposta; as regras ficam no service.
const healthService = require("../services/health.service");

function check(req, res) {
  res.json({ ok: true, mensagem: "AjudaMais API funcionando", dados: healthService.status() });
}

module.exports = { check };
