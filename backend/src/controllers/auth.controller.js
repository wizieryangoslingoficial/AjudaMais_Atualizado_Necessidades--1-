// Controller de autenticação
const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const result = await authService.cadastrar(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.entrar(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const result = await authService.recuperarSenha(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
}

async function recoverAccount(req, res, next) {
  try {
    const result = await authService.recuperarConta(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  recoverAccount,
};
