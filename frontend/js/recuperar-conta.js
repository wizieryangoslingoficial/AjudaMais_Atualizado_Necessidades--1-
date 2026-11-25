// Recuperar conta: escolhe entre e-mail e celular.
var method = "email";
var values = { email: "", phone: "" };
var input = document.getElementById("contact");
var options = document.querySelectorAll("[data-method]");

function setMethod(m) {
  values[method] = input.value;
  method = m;
  var isEmail = m === "email";
  options.forEach(function (o) { o.setAttribute("aria-checked", String(o.dataset.method === m)); });
  input.type = isEmail ? "email" : "tel";
  input.inputMode = isEmail ? "email" : "numeric";
  input.autocomplete = isEmail ? "email" : "tel";
  input.placeholder = isEmail ? "seu@email.com" : "(00) 00000-0000";
  input.setAttribute("aria-label", isEmail ? "E-mail" : "Celular");
  input.value = values[m];
  showErrors({}, ["contact"]);
}

options.forEach(function (o) { o.addEventListener("click", function () { setMethod(o.dataset.method); }); });
input.addEventListener("input", function () { if (method === "phone") input.value = formatPhone(input.value); });

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var errors = {};
  if (method === "email" && !isValidEmail(input.value)) errors.contact = "Informe um e-mail válido.";
  if (method === "phone" && !isValidPhone(input.value)) errors.contact = "Informe um celular válido.";
  if (!showErrors(errors, ["contact"])) return;
  AuthService.recuperarConta({ metodo: method, valor: input.value }).then(function (r) {
    showToast(r.ok ? "Enviamos as instruções para você." : r.mensagem);
  });
});
