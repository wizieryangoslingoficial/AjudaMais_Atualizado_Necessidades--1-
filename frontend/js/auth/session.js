// Sessão: diferencia visitante (anônimo) de usuário logado.
var Sessao = {
  carregar: function () {
    return AuthService.usuarioAtual().then(function (usuario) {
      document.body.dataset.acesso = usuario ? "logado" : "visitante";
      return usuario;
    });
  },
  exigirLogin: function () {
    return Sessao.carregar().then(function (usuario) {
      if (!usuario) window.location.href = "login.html";
      return usuario;
    });
  }
};
Sessao.carregar();
