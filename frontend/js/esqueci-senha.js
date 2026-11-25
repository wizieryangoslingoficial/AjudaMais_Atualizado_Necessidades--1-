document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var errors = isValidEmail(value("email")) ? {} : { email: "Informe um e-mail válido." };
  if (!showErrors(errors, ["email"])) return;
  AuthService.recuperarSenha(value("email")).then(function (r) {
    showToast(r.ok ? "Enviamos um link para o seu e-mail." : r.mensagem);
  });
});
