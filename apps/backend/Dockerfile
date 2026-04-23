FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
# Устанавливаем зависимости для работы Prisma в alpine
RUN apk add --no-cache openssl
RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 5000

# Используем более надежный способ запуска
# Мы явно вызываем prisma через pnpm exec и проверяем наличие переменной
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/src/main"]