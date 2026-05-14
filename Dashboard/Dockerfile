# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar manifiestos primero (mejor cache de capas)
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Copiar código fuente y compilar
COPY . .
RUN npm run build
# Output en /app/dist

# ── Stage 2: Runtime (Nginx) ─────────────────────────────────
FROM nginx:1.27-alpine AS runtime

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
