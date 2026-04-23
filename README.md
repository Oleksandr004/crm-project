# Mini Lead Tracker

Це монорепо з міні-CRM, що складається з бекенду на NestJS + Prisma + PostgreSQL та фронтенду на Next.js App Router.

## 1. Запуск локально

### Backend

```bash
cd apps/backend
pnpm install
cp .env.example .env
pnpm run start:dev
```

Backend буде доступний за адресою `http://localhost:5000`.

### Frontend

```bash
cd apps/frontend
pnpm install
cp .env.example .env
pnpm run dev
```

Frontend буде доступний за адресою `http://localhost:3000`.

### Запуск через Docker

```bash
cd apps
docker compose up --build
```

Після підняття контейнерів:

- frontend: `http://localhost:3000`
- backend: `http://localhost:5000`
- Swagger: `http://localhost:5000/api/docs`

## 2. Змінні оточення

### Backend

Файл: `apps/backend/.env.example`

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/crm?schema=public
```

Пояснення:

- `PORT` — порт, на якому запускається NestJS сервер.
- `FRONTEND_URL` — адресу фронтенду для CORS.
- `DATABASE_URL` — підключення до PostgreSQL у форматі Prisma.

### Frontend

Файл: `apps/frontend/.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Пояснення:

- `NEXT_PUBLIC_API_URL` — базовий URL для запитів до backend API.

## 3. Перевірка API

### Swagger

Документація доступна за адресою:

- `http://localhost:5000/api/docs`

### Основні приклади ендпоінтів

#### Список лідов

```bash
curl "http://localhost:5000/api/leads?page=1&limit=10&status=NEW&q=example"
```

#### Створення нового ліда

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john.doe@example.com","company":"Example Inc.","status":"NEW","value":1000,"notes":"Перший контакт"}'
```

#### Додавання коментаря

```bash
curl -X POST http://localhost:5000/api/leads/{leadId}/comments \
  -H "Content-Type: application/json" \
  -d '{"text":"Заплановано дзвінок наступного тижня."}'
```

Замість `{leadId}` підставте реальний `id` ліда.

## 4. Build та prod-режим

### Backend

```bash
cd apps/backend
pnpm install
cp .env.example .env
pnpm run build
pnpm run start:prod
```

### Frontend

```bash
cd apps/frontend
pnpm install
cp .env.example .env
pnpm run build
pnpm run start
```

### Через Docker

```bash
cd apps
docker compose up --build
```
