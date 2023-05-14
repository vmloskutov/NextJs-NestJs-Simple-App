FROM node:16-alpine AS deps
WORKDIR /app

COPY package*.json ./

ENV NODE_ENV production
RUN npm ci
# -------------------------------------- #

FROM node:16-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build
# -------------------------------------- #

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD [ "node", "server.js" ]
