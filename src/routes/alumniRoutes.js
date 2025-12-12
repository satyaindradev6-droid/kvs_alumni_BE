import express from 'express';
import * as alumniController from '../controllers/alumniController.js';
import { authenticate } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Public routes - New Registration APIs
router.post('/register-student', upload.single('photo'), alumniController.registerStudent);
router.post('/register-employee', upload.single('photo'), alumniController.registerEmployee);

// Public routes
router.post('/login', alumniController.login);
router.get('/all', alumniController.getAllAlumni);
router.get('/:id', authenticate, alumniController.getAlumniById);

// Protected routes
router.get('/profile/me', authenticate, alumniController.getProfile);
router.put('/profile/me', authenticate, alumniController.updateProfile);
router.post('/profile/photo', authenticate, upload.single('photo'), alumniController.uploadProfilePhoto);
router.delete('/profile/me', authenticate, alumniController.deleteAccount);

export default router;
