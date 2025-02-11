# Dockerfile

# Use the official Node.js 20 image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (using CI for production)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application (assumes Next.js 15)
RUN npm run build

# Production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose the desired port (3001 for dvh.sh)
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]
