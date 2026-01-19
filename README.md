# Nuxt Minimal Starter

1. bun : 1.3.6 ===> Package Manager
2. nuxt : 4.4.2 ===> Bahasa Pemrograman
3. prisma : 6.19.2 ===> ORM PostgreSQL
4. lucia : 3.2.2 ===> Auth

## Setup

1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Ubah .env.example jadi .env

3. Install Dependencies:

```bash
bun install
```

4. Generate Prisma Client, berfungsi untuk mengenalkan model client berdasarkan schema prisma

```bash
bunx prisma generate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

## Penjelasan Sintag

Initial Project:

```bash
bunx nuxi init {{nama-aplikasi}}
```

Menambah dependency:

```bash
bun add {{nama-dependency}}
```

Initial Prisma:

```bash
bunx prisma init
```

Migrasi Prisma:

```bash
bunx prisma migrate dev --name {{nama-migration}}
```

Pull dari DB ke Prisma:

```bash
bunx prisma db pull
```

Pull dari Prisma ke DB, biasanya setelah ada perbaikan di schema.prisma:

```bash
bunx prisma db push
```