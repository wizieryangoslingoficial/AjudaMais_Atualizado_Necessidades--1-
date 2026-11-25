const { Router } = require("express");
const { getPool } = require("../config/db");

const router = Router();

const defaultDonations = [
  { initials: "M", name: "Maria Silva", detail: "Dinheiro • R$ 100", time: "5 min atrás" },
  { initials: "J", name: "João Santos", detail: "Alimentos • 10 cestas básicas", time: "15 min atrás" },
  { initials: "A", name: "Ana Costa", detail: "Roupas • 25 peças", time: "1 hora atrás" },
  { initials: "P", name: "Pedro Oliveira", detail: "Dinheiro • R$ 250", time: "2 horas atrás" },
  { initials: "C", name: "Carla Souza", detail: "Cobertores • 15 unidades", time: "3 horas atrás" },
];

router.get("/", async (req, res) => {
  if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
    try {
      const pool = getPool();
      const [rows] = await pool.query("SELECT * FROM help_requests ORDER BY criado_em DESC LIMIT 10");
      if (rows && rows.length > 0) {
        return res.json({ ok: true, dados: rows });
      }
    } catch (err) {
      // Fallback silencioso para dados iniciais
    }
  }
  res.json({ ok: true, dados: defaultDonations });
});

module.exports = router;
