module.exports = function notFound(req, res) {
  res.status(404).json({ ok: false, mensagem: "Rota não encontrada." });
};
