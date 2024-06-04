# Use a lightweight Node.js image
FROM node:20-apline

# Set working directory
WORKDIR /app

# Install ffmpeg
RUN apk add --update && \
    apk add --no-cache ffmpeg libx264-dev

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .

# Initializing Prisma Client
RUN npx prisma generate
CMD [ "npx", "prisma", "migrate", "dev" ]

# Build the Next.js app (assuming a production build)
RUN npm run build

# Expose port for Next.js app (typically 3000)
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "start" ]