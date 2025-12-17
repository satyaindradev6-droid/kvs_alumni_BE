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
router.post('/forgot-password', alumniController.forgotPassword);
router.get('/all', alumniController.getAllAlumni);

// Debug route to check JWT token
router.get('/debug/token', authenticate, (req, res) => {
  res.json({
    user: req.user,
    message: 'Token parsed successfully'
  });
});

// Debug route to test student profile update without validation
router.put('/debug/student/:alumni_id', authenticate, async (req, res) => {
  try {
    const { alumni_id } = req.params;
    console.log('=== DEBUG STUDENT UPDATE ===');
    console.log('Alumni ID:', alumni_id);
    console.log('Request body:', req.body);
    console.log('===========================');
    
    // Simple response without database update for testing
    res.json({
      message: 'Debug: Student profile update received',
      alumni_id: alumni_id,
      received_data: req.body,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug route to list existing students
router.get('/debug/students', authenticate, async (req, res) => {
  try {
    const { getAllAlumniStudents } = await import('../models/alumniModel.js');
    const students = await getAllAlumniStudents();
    
    res.json({
      message: 'All students in database',
      count: students.length,
      students: students.map(s => ({
        alumni_id: s.alumni_id,
        name: s.name,
        email_id: s.email_id
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug route to list existing employees  
router.get('/debug/employees', authenticate, async (req, res) => {
  try {
    const prisma = (await import('../config/prisma.js')).default;
    const employees = await prisma.alumni_employee.findMany({
      where: { is_deleted: 0 },
      select: {
        alumni_id: true,
        name: true,
        email_id: true,
        emp_code: true
      }
    });
    
    res.json({
      message: 'All employees in database',
      count: employees.length,
      employees: employees
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected routes - Student specific (must come before generic routes)
router.get('/student/profile/me', authenticate, alumniController.getStudentProfile);
router.put('/student/profile/me', authenticate, alumniController.updateStudentProfile);
router.get('/student/profile/:alumni_id', authenticate, alumniController.getStudentProfileById);
router.put('/student/profile/:alumni_id', authenticate, alumniController.updateStudentProfileById);

// Protected routes - Employee specific (must come before generic routes)
router.get('/employee/profile/me', authenticate, alumniController.getEmployeeProfile);
router.put('/employee/profile/me', authenticate, alumniController.updateEmployeeProfile);
router.get('/employee/profile/:alumni_id', authenticate, alumniController.getEmployeeProfileById);
router.put('/employee/profile/:alumni_id', authenticate, alumniController.updateEmployeeProfileById);

// Protected routes - Generic (backward compatibility)
router.get('/profile/me', authenticate, alumniController.getProfile);
router.put('/profile/me', authenticate, alumniController.updateProfile);
router.post('/profile/photo', authenticate, upload.single('photo'), alumniController.uploadProfilePhoto);
router.delete('/profile/me', authenticate, alumniController.deleteAccount);

// Public routes - Dynamic ID route (must come last to avoid conflicts)
router.get('/:id', alumniController.getAlumniById);

export default router;
