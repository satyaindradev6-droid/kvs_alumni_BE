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
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000'
];

// Add LAN IP origins if available
if (LAN_IP) {
  allowedOrigins.push(`http://${LAN_IP}:5000`);
  allowedOrigins.push(`http://${LAN_IP}:3000`);
}

app.use(cors({
  origin: allowedOrigins,
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
      // Generic profile endpoints
      profile: 'GET /api/alumni/profile/me',
      updateProfile: 'PUT /api/alumni/profile/me',
      uploadPhoto: 'POST /api/alumni/profile/photo',
      deleteAccount: 'DELETE /api/alumni/profile/me',
      // Student-specific endpoints
      studentProfile: 'GET /api/alumni/student/profile/me',
      updateStudentProfile: 'PUT /api/alumni/student/profile/me',
      studentProfileById: 'GET /api/alumni/student/profile/:alumni_id',
      updateStudentProfileById: 'PUT /api/alumni/student/profile/:alumni_id',
      // Employee-specific endpoints
      employeeProfile: 'GET /api/alumni/employee/profile/me',
      updateEmployeeProfile: 'PUT /api/alumni/employee/profile/me',
      employeeProfileById: 'GET /api/alumni/employee/profile/:alumni_id',
      updateEmployeeProfileById: 'PUT /api/alumni/employee/profile/:alumni_id',
      // Other endpoints
      getAllAlumni: 'GET /api/alumni/all',
      getAlumniById: 'GET /api/alumni/:id'
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
