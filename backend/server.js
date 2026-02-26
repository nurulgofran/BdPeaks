const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// 1. Submit a new contribution
app.post('/api/contributions', async (req, res) => {
    try {
        const { contributorName, email, mountainName, latitude, longitude, notes, proofUrl } = req.body;

        // Basic validation
        if (!contributorName || !email || !mountainName || !latitude || !longitude) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const contribution = await prisma.contribution.create({
            data: {
                contributorName,
                email,
                mountainName,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                notes,
                proofUrl
            }
        });

        res.status(201).json({ message: "Contribution submitted successfully", data: contribution });
    } catch (error) {
        console.error("Error creating contribution:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Get all contributions (Admin)
app.get('/api/contributions', async (req, res) => {
    try {
        // In a real app, this should be protected by authentication
        const contributions = await prisma.contribution.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(contributions);
    } catch (error) {
        console.error("Error fetching contributions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 3. Health check for Coolify
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
