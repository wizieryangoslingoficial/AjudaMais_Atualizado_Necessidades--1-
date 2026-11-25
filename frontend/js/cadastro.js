document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var ids = ["name", "email", "cpf", "password", "confirm"];
  var data = {};
  ids.forEach(function (id) { data[id] = value(id); });
  if (!showErrors(validateSignup(data), ids)) return;
  AuthService.cadastrar({ name: data.name, email: data.email, cpf: data.cpf, password: data.password }).then(function (r) {
    if (r.ok) {
      showToast("Conta criada com sucesso! Redirecionando...");
      setTimeout(function () { window.location.href = "index.html"; }, 900);
    } else {
      showToast(r.mensagem);
    }
  });
});
