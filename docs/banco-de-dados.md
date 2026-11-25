# AjudaMais — Planejamento do banco de dados (Supabase / PostgreSQL)

> Isto é só um planejamento. **Ainda não foi executado.** Na Etapa 2, cole o SQL abaixo no SQL Editor do Supabase.

## Contas
O Supabase já guarda e-mail e senha (criptografada) na tabela interna `auth.users`. Os dados extras ficam em `profiles`.

**Decisão pendente:** o Supabase faz login por e-mail. A tela Entrar pede o CPF, e o e-mail é opcional. Há duas opções:
(a) deixar o e-mail obrigatório no login, ou (b) criar uma função no servidor que encontra o e-mail pelo CPF.

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  cpf text not null unique,          -- só números, 11 dígitos
  celular text,
  termos_aceitos_em timestamptz not null default now(),
  criado_em timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "ver o próprio perfil"    on public.profiles for select using (auth.uid() = id);
create policy "editar o próprio perfil" on public.profiles for update using (auth.uid() = id);

-- Cria o perfil automaticamente no cadastro (nome e cpf vêm de signUp options.data)
create function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nome, cpf)
  values (new.id, new.raw_user_meta_data->>'nome', new.raw_user_meta_data->>'cpf');
  return new;
end $$;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.criar_perfil();
```

## Pedidos de ajuda
```sql
create type categoria_ajuda as enum ('dinheiro','alimentos','roupas','cobertores','outros');
create type status_ajuda    as enum ('aberto','em_andamento','atendido');

create table public.help_requests (
  id uuid primary key default gen_random_uuid(),
  solicitante_id uuid not null references public.profiles(id) on delete cascade,
  categoria categoria_ajuda not null,
  descricao text not null,
  quantidade text,
  status status_ajuda not null default 'aberto',
  criado_em timestamptz not null default now()
);
alter table public.help_requests enable row level security;
-- Visitantes e logados veem só os pedidos abertos
create policy "ver pedidos abertos" on public.help_requests for select using (status = 'aberto' or auth.uid() = solicitante_id);
-- Só quem está logado cria, e só em seu nome
create policy "criar pedido" on public.help_requests for insert to authenticated with check (auth.uid() = solicitante_id);
create policy "editar o próprio pedido" on public.help_requests for update to authenticated using (auth.uid() = solicitante_id);
```
Os pedidos abertos não mostram CPF nem contato. Esses dados ficam só em `profiles`, que é privada.
