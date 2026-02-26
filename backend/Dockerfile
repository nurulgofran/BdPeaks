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

# Create the database file safely
RUN npx prisma db push

EXPOSE 3000

CMD ["node", "server.js"]
