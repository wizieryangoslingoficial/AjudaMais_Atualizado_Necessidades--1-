// Conexão com o MySQL (mysql2, pool de conexões).
// O pool só é criado quando alguém pede — nenhuma consulta é feita agora.
// Use sempre consultas com parâmetros (?) para evitar SQL injection.
const mysql = require("mysql2/promise");

let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
    });
  }
  return pool;
}

module.exports = { getPool };
