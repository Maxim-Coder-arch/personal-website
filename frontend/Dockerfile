
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci \
    --no-audit \
    --no-fund \
    --maxsockets=2 \
    --fetch-retries=10 \
    --fetch-retry-mintimeout=30000 \
    --fetch-retry-maxtimeout=180000 \
    --fetch-timeout=600000


FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

ARG SITE_URL
ENV SITE_URL=${SITE_URL}

RUN test -n "$BACKEND_URL" || (echo "BACKEND_URL build arg is required" && exit 1)

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ARG BACKEND_URL
ARG SITE_URL

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV BACKEND_URL=${BACKEND_URL}
ENV SITE_URL=${SITE_URL}

COPY package.json package-lock.json ./

COPY --from=deps /app/node_modules ./node_modules

RUN npm prune --omit=dev --no-audit --no-fund

COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

USER node

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]