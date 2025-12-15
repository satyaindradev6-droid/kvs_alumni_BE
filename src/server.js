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
const HOST = process.env.HOST || '0.0.0.0';
const LAN_IP = process.env.LAN_IP;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', `http://${LAN_IP}:5000`, `http://${LAN_IP}:3000`],
  credentials: true
}));
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
      registerStudent: 'POST /api/alumni/register-student',
      registerEmployee: 'POST /api/alumni/register-employee',
      login: 'POST /api/alumni/login',
      forgotPassword: 'POST /api/alumni/forgot-password',
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
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on:`);
  console.log(`   Local:   http://localhost:${PORT}`);
  if (LAN_IP) {
    console.log(`   Network: http://${LAN_IP}:${PORT}`);
  }
  console.log(`   Host:    http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});
