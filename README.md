## Turismo FM

Plataforma institucional da Turismo FM 90.3 com:

- home pública com streaming, notícias, programação, equipe e patrocinadores
- painel administrativo protegido por senha
- ingestão de notícias via RSS
- persistência com Prisma + PostgreSQL, com fallback para mocks quando o banco não estiver disponível

## Rodando localmente

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`
- `CRON_SECRET`
- `NEXT_PUBLIC_SITE_URL`

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`

## Banco de dados

- schema Prisma em `prisma/schema.prisma`
- seed em `prisma/seed.js`

## Automação RSS

O endpoint `src/app/api/cron/rss-sync/route.ts` processa feeds ativos e está preparado para uso com Vercel Cron.

## Deploy

Projeto preparado para Next.js 14 em Vercel.
