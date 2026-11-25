// Junta todas as rotas da API (prefixo /api).
const { Router } = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const donationsRoutes = require("./donations.routes");

const router = Router();
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/donations", donationsRoutes);

module.exports = router;
