FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY domain/package*.json ./domain/
COPY apps/backend/package*.json ./apps/backend/
COPY apps/backend/tsconfig.json ./apps/backend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/backend

COPY domain ./domain
COPY apps/backend ./apps/backend

RUN npm run build --prefix ./domain

RUN npm run build --prefix ./apps/backend

FROM node:22-slim AS runner
WORKDIR /app

COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/domain ./domain

COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/domain/node_modules ./domain/node_modules

COPY --from=builder /app/domain/package.json ./domain/package.json

ENV NODE_ENV=production

EXPOSE 3000

RUN mkdir -p /app/apps/backend/node_modules/@domain && \
    cp -r /app/domain/dist/entities /app/apps/backend/node_modules/@domain/ && \
    cp -r /app/domain/dist/services /app/apps/backend/node_modules/@domain/ && \
    cp -r /app/domain/dist/use-cases /app/apps/backend/node_modules/@domain/ && \
    cp -r /app/domain/dist/utils /app/apps/backend/node_modules/@domain/ && \
    cp /app/domain/dist/index.js /app/apps/backend/node_modules/@domain/ && \
    echo '{"name":"@domain","version":"1.0.0","type":"module"}' > /app/apps/backend/node_modules/@domain/package.json

WORKDIR /app/apps/backend
CMD ["node", "-r", "tsconfig-paths/register", "./dist/index.js"]
