import express from 'express';
import * as schoolController from '../controllers/schoolController.js';

const router = express.Router();

// Get all states
router.get('/states', schoolController.getAllStates);

// Get all schools (with optional filters)
router.get('/schools', schoolController.getAllSchools);

// Get schools by state_id
router.get('/states/:state_id/schools', schoolController.getSchoolsByState);

// Get school by ID
router.get('/schools/:id', schoolController.getSchoolById);

export default router;
