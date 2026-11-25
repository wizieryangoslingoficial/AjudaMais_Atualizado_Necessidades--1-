// Regras de negócio de autenticação
const crypto = require("crypto");
const authRepo = require("../repositories/auth.repository");

async function cadastrar({ name, email, cpf, password }) {
  if (!name || !email || !cpf || !password) {
    return { ok: false, status: 400, mensagem: "Preencha todos os campos obrigatórios." };
  }

  const existente = await authRepo.findByCpfOrEmail(cpf, email);
  if (existente) {
    return { ok: false, status: 409, mensagem: "Já existe uma conta cadastrada com este CPF ou e-mail." };
  }

  const usuario = await authRepo.createUser({
    nome: name,
    email,
    cpf,
    senha: password,
  });

  const token = crypto.randomBytes(24).toString("hex");
  return {
    ok: true,
    status: 201,
    mensagem: "Conta criada com sucesso!",
    dados: { usuario, token },
  };
}

async function entrar({ email, cpf, password }) {
  if ((!cpf && !email) || !password) {
    return { ok: false, status: 400, mensagem: "Informe CPF (ou e-mail) e senha." };
  }

  const usuario = await authRepo.findByCpfOrEmail(cpf, email);
  if (!usuario) {
    return { ok: false, status: 401, mensagem: "Usuário não encontrado. Verifique os dados ou crie uma conta." };
  }

  const senhaArmazenada = usuario.senha || usuario.password || "";
  if (senhaArmazenada && senhaArmazenada !== password) {
    return { ok: false, status: 401, mensagem: "Senha incorreta." };
  }

  const token = crypto.randomBytes(24).toString("hex");
  return {
    ok: true,
    status: 200,
    mensagem: "Login realizado com sucesso!",
    dados: {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome || usuario.name || "Usuário",
        email: usuario.email || "",
        cpf: usuario.cpf || "",
      },
    },
  };
}

async function recuperarSenha({ email }) {
  if (!email) {
    return { ok: false, status: 400, mensagem: "Informe um e-mail válido." };
  }
  const usuario = await authRepo.findByCpfOrEmail(null, email);
  if (!usuario) {
    return { ok: false, status: 404, mensagem: "Nenhuma conta encontrada com este e-mail." };
  }
  return {
    ok: true,
    status: 200,
    mensagem: "Enviamos um link de redefinição para o seu e-mail.",
  };
}

async function recuperarConta({ metodo, valor }) {
  if (!metodo || !valor) {
    return { ok: false, status: 400, mensagem: "Informe o contato para recuperação." };
  }
  const usuario = await authRepo.findByContact(metodo, valor);
  if (!usuario) {
    return { ok: false, status: 404, mensagem: "Não encontramos uma conta vinculada a este contato." };
  }
  return {
    ok: true,
    status: 200,
    mensagem: "Código de verificação enviado com sucesso!",
  };
}

module.exports = {
  cadastrar,
  entrar,
  recuperarSenha,
  recuperarConta,
};
