import express from 'express';
import * as educationController from '../controllers/educationController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all educations for logged-in user
router.get('/me', educationController.getMyEducations);

// Get educations by alumni_id
router.get('/alumni/:alumni_id', educationController.getEducationsByAlumniId);

// Create new education
router.post('/', educationController.createEducation);

// Get single education by ID
router.get('/:id', educationController.getEducationById);

// Update education
router.patch('/:id', educationController.updateEducation);

// Delete education
router.delete('/:id', educationController.deleteEducation);

export default router;
