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

# Expose port 3000
EXPOSE 3000

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma db push && node server.js"]
