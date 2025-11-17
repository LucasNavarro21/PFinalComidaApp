FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY domain/package*.json ./domain/
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/frontend

COPY domain ./domain
COPY apps/frontend ./apps/frontend

RUN npm run build --prefix ./apps/frontend


FROM node:22-slim AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
