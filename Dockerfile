# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY . .

RUN npm run build

# Stage 2: Run with PM2
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production && npm install -g pm2

COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 3000

CMD ["pm2-runtime", "dist/app.local.js"]
