const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
    'https://bdpeaks.info',
    'https://www.bdpeaks.info',
    'http://localhost:8080',
    'http://localhost:5173',
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
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

// 3. Update contribution status (Admin - Approve/Reject)
app.patch('/api/contributions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
            return res.status(400).json({ error: "Invalid status. Must be APPROVED, REJECTED, or PENDING." });
        }

        const contribution = await prisma.contribution.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.json({ message: `Contribution ${status.toLowerCase()} successfully`, data: contribution });
    } catch (error) {
        console.error("Error updating contribution:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 4. Health check for Coolify
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
