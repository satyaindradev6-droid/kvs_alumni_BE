import express from 'express';
import * as experienceController from '../controllers/experienceController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all experiences (all users)
router.get('/all', experienceController.getAllExperiences);

// Get all experiences for logged-in user
router.get('/me', experienceController.getMyExperiences);

// Get experiences by alumni_id
router.get('/alumni/:alumni_id', experienceController.getExperiencesByAlumniId);

// Create new experience
router.post('/', experienceController.createExperience);

// Get single experience by ID
router.get('/:id', experienceController.getExperienceById);

// Update experience
router.patch('/:id', experienceController.updateExperience);

// Delete experience
router.delete('/:id', experienceController.deleteExperience);

export default router;
