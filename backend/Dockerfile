FROM node:20-alpine

# Install openssl for Prisma
RUN apk update && apk add openssl

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Create a separate data directory for the SQLite database
# This is where the persistent volume should be mounted
RUN mkdir -p /data

# Expose port 3000
EXPOSE 3000

# Run migrations (pointing to /data for the DB) then start the server
CMD ["sh", "-c", "npx prisma db push && node server.js"]
