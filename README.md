# AjudaMais — Sistema Integrado (Front-end + Back-end)

## Estrutura de Pastas
- `frontend/`: Todas as telas HTML, CSS e JavaScript puro unificados:
  - `index.html`: Homepage / Painel principal do AjudaMais.
  - `acesso.html`: Tela de aceite de termos e escolha de acesso (Entrar, Criar conta ou Doação anônima).
  - `login.html`: Tela de login integrada à API `/api/auth/login`.
  - `cadastro.html`: Tela de cadastro integrada à API `/api/auth/register`.
  - `esqueci-senha.html` & `recuperar-conta.html`: Recuperação de acesso integrada à API.
  - `termos.html`: Termos de Uso e Política de Privacidade.
- `backend/`: Servidor Node.js + Express + MySQL:
  - Serve a API REST em `/api/*` (`/api/health`, `/api/auth/*`, `/api/donations`).
  - Serve automaticamente toda a pasta `frontend/` na raiz `http://localhost:3000`.
- `docs/`: Documentação da estrutura do banco de dados (`banco-de-dados.md`).

## Como rodar o sistema completo
1. Abra o terminal na pasta `backend`:
   ```bash
   cd backend
   npm install
   ```
2. (Opcional) Copie `.env.example` para `.env` e configure as credenciais do seu MySQL local.
   *Nota: Mesmo antes de configurar o MySQL, o sistema já funciona com um usuário de demonstração (`CPF: 123.456.789-09` / `Senha: 123456`) ou permitindo novos cadastros na sessão.*
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Acesse no navegador: **http://localhost:3000**
