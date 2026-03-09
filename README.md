# BdPeaks

This project is a web application built using:
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: Prisma ORM with SQLite

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn or pnpm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nurulgofran/BdPeaks.git
   cd BdPeaks
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   Copy `.env.example` to `.env` in both the root and `backend` directories as needed.

5. Set up the database:
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

### Running the App Locally

1. Start the React Frontend:
   ```bash
   # In the root directory
   npm run dev
   ```

2. Start the Node.js Backend:
   ```bash
   # In the backend directory
   npm run start
   # or node server.js
   ```

## Folder Structure

- `/src` - React frontend code
- `/backend` - Node.js/Express backend code and Prisma schema
- `/public` - Static assets

## License
MIT License
