# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# ---- Dependencies (includes prisma CLI, needed at container startup for `prisma db push`) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Runtime ----
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/src/generated ./src/generated

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "npx prisma db push --skip-generate --accept-data-loss && npm run start"]
