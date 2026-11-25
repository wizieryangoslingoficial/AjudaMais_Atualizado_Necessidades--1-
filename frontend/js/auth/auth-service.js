// Serviço de autenticação integrado com a API Express do AjudaMais.
var AuthService = (function () {
  var STORAGE_USER = "ajudamais_usuario";
  var STORAGE_TOKEN = "ajudamais_token";

  function request(endpoint, method, body) {
    return fetch(AJUDAMAIS_CONFIG.apiBaseUrl + endpoint, {
      method: method || "GET",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: false, mensagem: "Resposta inválida do servidor." };
        });
      })
      .catch(function () {
        return {
          ok: false,
          mensagem: "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
        };
      });
  }

  function salvarSessao(dados) {
    if (dados && dados.usuario) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(dados.usuario));
    }
    if (dados && dados.token) {
      localStorage.setItem(STORAGE_TOKEN, dados.token);
    }
  }

  function limparSessao() {
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  }

  return {
    cadastrar: function (dados) {
      return request("/auth/register", "POST", dados).then(function (r) {
        if (r.ok && r.dados) salvarSessao(r.dados);
        return r;
      });
    },

    entrar: function (dados) {
      return request("/auth/login", "POST", dados).then(function (r) {
        if (r.ok && r.dados) salvarSessao(r.dados);
        return r;
      });
    },

    sair: function () {
      limparSessao();
      return Promise.resolve({ ok: true, mensagem: "Sessão encerrada." });
    },

    recuperarSenha: function (email) {
      return request("/auth/forgot-password", "POST", { email: email });
    },

    recuperarConta: function (contato) {
      return request("/auth/recover-account", "POST", contato);
    },

    usuarioAtual: function () {
      try {
        var raw = localStorage.getItem(STORAGE_USER);
        return Promise.resolve(raw ? JSON.parse(raw) : null);
      } catch (e) {
        return Promise.resolve(null);
      }
    },
  };
})();
