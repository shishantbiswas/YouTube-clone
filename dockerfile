FROM node:20-alpine

WORKDIR /app

RUN apk add --update &&  apk add --no-cache ffmpeg

COPY package.json package-lock.json ./

RUN npm install

COPY . .
# Set build arguments
ARG REDIS_URL

# Set environment variables
ENV REDIS_URL=$REDIS_URL

RUN npx prisma generate
CMD [ "npx", "prisma", "migrate", "dev" ]

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]