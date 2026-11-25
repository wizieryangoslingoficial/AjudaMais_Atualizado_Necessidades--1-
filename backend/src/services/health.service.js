// Regras do teste de saúde. Não consulta o banco.
function status() {
  return { servidor: "online", horario: new Date().toISOString() };
}

module.exports = { status };
