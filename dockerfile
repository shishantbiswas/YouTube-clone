# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install ffmpeg
RUN apk add --no-cache ffmpeg

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./app

# Install dependencies
RUN npm install

# Initializing Prisma Client
RUN npx prisma generate
CMD [ "npx", "prisma", "migrate", "dev" ]

# Build the Next.js app (assuming a production build)
RUN npm run build

# Expose port for Next.js app (typically 3000)
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "start" ]