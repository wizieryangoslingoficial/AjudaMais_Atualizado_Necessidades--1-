// Erros inesperados: registra no terminal e responde sem expor detalhes internos.
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ ok: false, mensagem: "Erro interno do servidor." });
};
