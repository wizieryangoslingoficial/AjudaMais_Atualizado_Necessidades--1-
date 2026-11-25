document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var errors = validateLogin({ cpf: value("cpf"), password: value("password") });
  if (!showErrors(errors, ["cpf", "password"])) return;
  AuthService.entrar({ email: value("email"), cpf: value("cpf"), password: value("password") }).then(function (r) {
    if (r.ok) window.location.href = "index.html";
    else showToast(r.mensagem);
  });
});
