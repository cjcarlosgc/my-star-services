# ---------- build ----------
FROM node:20-slim AS build
WORKDIR /app

# deps para compilar TS
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build   # compila TS -> dist/

# ---------- run ----------
FROM node:20-slim
WORKDIR /app

# Certs TLS + tini + curl (para healthcheck y señales limpias)
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates tini curl \
 && rm -rf /var/lib/apt/lists/* \
 && update-ca-certificates

ENV NODE_ENV=production
# valor por defecto para local; en Render se sobreescribe
ENV PORT=3000

# Sólo deps de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Prisma: copia schema y genera cliente para linux-gnu (Debian slim)
COPY prisma ./prisma
RUN npx prisma generate

# Artefactos de build
COPY --from=build /app/dist ./dist

# Usuario no-root (la imagen ya trae 'node')
USER node

EXPOSE 3000

# HEALTHCHECK del contenedor (liveness)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/health" || exit 1

# tini maneja señales correctamente (graceful shutdown)
ENTRYPOINT ["/usr/bin/tini","-g","--"]

# Sin migrate: sólo arrancar la app
CMD ["node","dist/server.js"]
