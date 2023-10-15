# Stage 1 - Build
FROM node:latest AS builder

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - Run
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/src/dist ./dist

CMD npm run start:prod