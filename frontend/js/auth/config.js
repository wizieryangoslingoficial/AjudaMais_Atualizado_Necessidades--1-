// Configuração da API do AjudaMais (Backend Node.js + Express)
var AJUDAMAIS_CONFIG = {
  apiBaseUrl: window.location.origin && window.location.origin.startsWith("http")
    ? window.location.origin + "/api"
    : "http://localhost:3000/api"
};
