import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import alumniRoutes from './routes/alumniRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import prisma from './config/prisma.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'KVS Alumni Portal API',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/alumni/register',
      login: 'POST /api/alumni/login',
      profile: 'GET /api/alumni/profile/me',
      updateProfile: 'PUT /api/alumni/profile/me',
      uploadPhoto: 'POST /api/alumni/profile/photo',
      getAllAlumni: 'GET /api/alumni/all',
      getAlumniById: 'GET /api/alumni/:id',
      deleteAccount: 'DELETE /api/alumni/profile/me'
    }
  });
});

app.use('/api/alumni', alumniRoutes);
app.use('/api', schoolRoutes);

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});
