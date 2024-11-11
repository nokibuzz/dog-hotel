This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Initialize node_modules by running next command

```bash
# some packages are not fully compatible with react, but we don't give a fuck
npm install --legacy-peer-deps
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma

https://authjs.dev/getting-started/adapters/prisma

```bash
npx prisma db push # will push initial schema to the db
```
