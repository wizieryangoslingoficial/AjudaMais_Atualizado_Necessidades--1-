// Repositório de usuários: utiliza o pool MySQL (getPool) sem alterar a estrutura do banco.
const { getPool } = require("../config/db");

// Armazenamento em memória para funcionamento imediato caso o banco local ainda esteja vazio/desconectado
const memoryUsers = [
  {
    id: 1,
    nome: "Usuário Demonstração",
    email: "demo@ajudamais.org",
    cpf: "12345678909",
    celular: "11999999999",
    senha: "123456",
  },
];

function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}

async function findByCpfOrEmail(cpf, email) {
  const cleanCpf = cpf ? cpf.replace(/\D/g, "") : "";
  if (isDbConfigured()) {
    try {
      const pool = getPool();
      const [rows] = await pool.query(
        "SELECT * FROM profiles WHERE cpf = ? OR email = ? LIMIT 1",
        [cleanCpf, email || ""]
      );
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.warn("[DB] Aviso ao consultar MySQL (usando fallback local):", err.message);
    }
  }
  return memoryUsers.find(
    (u) => (cleanCpf && u.cpf === cleanCpf) || (email && u.email.toLowerCase() === email.toLowerCase())
  ) || null;
}

async function findByContact(metodo, valor) {
  const cleanVal = metodo === "phone" ? valor.replace(/\D/g, "") : valor.trim().toLowerCase();
  if (isDbConfigured()) {
    try {
      const pool = getPool();
      const col = metodo === "phone" ? "celular" : "email";
      const [rows] = await pool.query(`SELECT * FROM profiles WHERE ${col} = ? LIMIT 1`, [cleanVal]);
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.warn("[DB] Aviso ao consultar contato no MySQL:", err.message);
    }
  }
  return memoryUsers.find((u) =>
    metodo === "phone" ? u.celular === cleanVal : u.email.toLowerCase() === cleanVal
  ) || null;
}

async function createUser({ nome, email, cpf, senha }) {
  const cleanCpf = cpf.replace(/\D/g, "");
  if (isDbConfigured()) {
    try {
      const pool = getPool();
      const [result] = await pool.query(
        "INSERT INTO profiles (nome, email, cpf, senha) VALUES (?, ?, ?, ?)",
        [nome.trim(), email.trim().toLowerCase(), cleanCpf, senha]
      );
      return { id: result.insertId, nome: nome.trim(), email: email.trim().toLowerCase(), cpf: cleanCpf };
    } catch (err) {
      console.warn("[DB] Aviso ao inserir no MySQL (salvando na sessão local):", err.message);
    }
  }
  const newUser = {
    id: memoryUsers.length + 1,
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    cpf: cleanCpf,
    celular: "",
    senha,
  };
  memoryUsers.push(newUser);
  return { id: newUser.id, nome: newUser.nome, email: newUser.email, cpf: newUser.cpf };
}

module.exports = {
  findByCpfOrEmail,
  findByContact,
  createUser,
};
