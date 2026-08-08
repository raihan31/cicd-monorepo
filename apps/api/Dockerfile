# syntax=docker/dockerfile:1

FROM node:22-alpine AS dependencies

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm ci

FROM dependencies AS builder

WORKDIR /workspace

COPY nx.json tsconfig.base.json ./
COPY jest.preset.js ./
COPY apps/api ./apps/api
COPY libs ./libs

RUN npx nx build api --configuration=production

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY --from=builder \
  /workspace/dist/apps/api \
  ./dist

USER node

EXPOSE 3000

HEALTHCHECK \
  --interval=30s \
  --timeout=3s \
  --start-period=10s \
  --retries=3 \
  CMD node -e \
  "fetch('http://127.0.0.1:3000/api/health').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"

CMD ["node", "dist/main.js"]