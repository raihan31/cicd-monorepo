# syntax=docker/dockerfile:1

FROM node:22-alpine AS dependencies

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm ci

FROM dependencies AS builder

WORKDIR /workspace

COPY nx.json tsconfig.base.json ./
COPY jest.preset.js ./
COPY apps/web ./apps/web
COPY libs ./libs

RUN npx nx build web --configuration=production

FROM nginx:alpine AS runtime

COPY infrastructure/docker/web/nginx.conf \
  /etc/nginx/conf.d/default.conf

COPY --from=builder \
  /workspace/dist/apps/web/browser \
  /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK \
  --interval=30s \
  --timeout=3s \
  --start-period=5s \
  --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/health || exit 1