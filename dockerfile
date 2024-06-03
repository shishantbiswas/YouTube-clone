# Use a lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

ENV DATABASE_URI=$DATABASE_URI

COPY . .

# Initializing Prisma Client
RUN npx prisma generate
CMD [ "npx", "prisma", "migrate", "dev" ]


# Build the Next.js app (assuming a production build)
RUN npm run build

# Create a new image for running the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the production build from the builder stage
COPY --from=builder /app .

# Install ffmpeg
RUN apk add --no-cache ffmpeg

# Expose port for Next.js app (typically 3000)
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "start" ]