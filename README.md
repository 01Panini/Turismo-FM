## Turismo FM

Plataforma institucional da Turismo FM 90.3 com:

- home pública com streaming, notícias, programação, equipe e patrocinadores
- painel administrativo protegido por senha
- ingestão de notícias via RSS
- persistência com Prisma + PostgreSQL, com fallback para mocks quando o banco não estiver disponível

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

Copie `.env.example` para `.env` e substitua os placeholders do banco. Os segredos administrativos podem permanecer no `.env.local`.

- `DATABASE_URL`: Transaction Pooler do Supabase, porta `6543`, usado pela aplicação
- `DIRECT_URL`: Session Pooler do Supabase, porta `5432`, usado pelo Prisma CLI
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`
- `CRON_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Nunca exponha a senha do banco, `service_role` ou secret keys em variáveis `NEXT_PUBLIC_*`.

## Supabase + Prisma

No painel do Supabase, abra **Connect** e copie:

1. A conexão **Transaction pooler** para `DATABASE_URL`. Mantenha `pgbouncer=true&connection_limit=1`.
2. A conexão **Session pooler** para `DIRECT_URL`.

Depois aplique o schema e importe o conteúdo inicial:

```bash
npm run db:push
npm run db:seed
```

O projeto usa somente o schema `public` gerenciado pelo Prisma; não referencia diretamente os schemas gerenciados `auth` ou `storage`.

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`
- `npm run db:push`
- `npm run db:seed`

## Banco de dados

- schema Prisma em `prisma/schema.prisma`
- seed idempotente em `prisma/seed.js`

## Automação RSS

O endpoint `src/app/api/cron/rss-sync/route.ts` processa feeds ativos e está preparado para uso com Vercel Cron.

## Deploy

Projeto preparado para Next.js 14 em Vercel.
