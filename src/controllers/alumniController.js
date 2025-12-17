import * as alumniModel from '../models/alumniModel.js';
import { 
  updateAlumniSchema,
  updateEmployeeSchema, 
  loginSchema,
  registerStudentSchema,
  registerEmployeeSchema,
  forgotPasswordSchema 
} from '../validations/alumniValidation.js';
import jwt from 'jsonwebtoken';

// Register Alumni Student
export const registerStudent = async (req, res, next) => {
  try {
    console.log('=== REGISTRATION DEBUG ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request file:', req.file);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body keys:', Object.keys(req.body));
    console.log('========================');
    
    const validatedData = registerStudentSchema.parse(req.body);
    
    // Handle mobile_number vs mobile_no field name
    if (!validatedData.mobile_no && validatedData.mobile_number) {
      validatedData.mobile_no = validatedData.mobile_number;
    }
    if (!validatedData.mobile_no) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }
    delete validatedData.mobile_number;
    
    // Check if email exists (only if email_id is provided)
    if (validatedData.email_id) {
      const existingStudent = await alumniModel.findStudentByEmail(validatedData.email_id);
      if (existingStudent) {
        return res.status(409).json({ error: 'Email already registered' });
      }
    }

    // Add profile image if uploaded
    if (req.file) {
      validatedData.profile_image = `/uploads/${req.file.filename}`;
    }

    // Set status to 0 for new registrations
    validatedData.status = '0';

    const student = await alumniModel.createAlumniStudent(validatedData);
    
    res.status(201).json({
      message: 'Alumni student registered successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
}; 

// Register Ex-Employee
export const registerEmployee = async (req, res, next) => {
  try {
    console.log('=== EMPLOYEE REGISTRATION DEBUG ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request file:', req.file);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('===================================');
    
    const validatedData = registerEmployeeSchema.parse(req.body);
    
    // Normalize field names (handle both snake_case and camelCase)
    const normalizedData = {
      name: validatedData.name,
      father_name: validatedData.fathername || validatedData.father_name,
      mobile_no: validatedData.mobileno || validatedData.mobile_no || validatedData.mobile_number,
      email_id: validatedData.emailid || validatedData.email_id || validatedData.email,
      emp_code: validatedData.empcode || validatedData.employee_code,
      tc_year: validatedData.tcyear || validatedData.retirement_year,
    };
    
    // Validate required fields
    const errors = [];
    if (!normalizedData.name) {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (normalizedData.name.length > 30) {
      errors.push({ field: 'name', message: 'Name must be 30 characters or less' });
    }
    
    if (!normalizedData.father_name) {
      errors.push({ field: 'father_name', message: 'Father name is required' });
    } else if (normalizedData.father_name.length > 60) {
      errors.push({ field: 'father_name', message: 'Father name must be 60 characters or less' });
    }
    
    if (!normalizedData.mobile_no) {
      errors.push({ field: 'mobile_no', message: 'Mobile number is required' });
    } else if (normalizedData.mobile_no.length !== 10) {
      errors.push({ field: 'mobile_no', message: 'Mobile number must be exactly 10 digits' });
    }
    
    if (!normalizedData.email_id) {
      errors.push({ field: 'email_id', message: 'Email is required' });
    } else if (normalizedData.email_id.length > 60) {
      errors.push({ field: 'email_id', message: 'Email must be 60 characters or less' });
    }
    
    if (!normalizedData.emp_code) {
      errors.push({ field: 'emp_code', message: 'Employee code is required' });
    } else if (normalizedData.emp_code.length > 25) {
      errors.push({ field: 'emp_code', message: 'Employee code must be 25 characters or less' });
    }
    
    if (!normalizedData.tc_year) {
      errors.push({ field: 'tc_year', message: 'Retirement year is required' });
    } else if (normalizedData.tc_year.length > 60) {
      errors.push({ field: 'tc_year', message: 'Retirement year must be 60 characters or less' });
    }
    
    if (!req.file) {
      errors.push({ field: 'photo', message: 'Profile photo is required' });
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    
    // Check if email exists
    const existingEmail = await alumniModel.findEmployeeByEmail(normalizedData.email_id);
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Check if employee code exists
    const existingCode = await alumniModel.findEmployeeByCode(normalizedData.emp_code);
    if (existingCode) {
      return res.status(409).json({ error: 'Employee code already exists' });
    }

    // Add profile image - store only filename (max 30 chars in DB)
    // Truncate filename if too long
    const filename = req.file.filename;
    normalizedData.profile_image = filename.length > 30 ? filename.substring(0, 30) : filename;
    
    // Add optional fields if present with length limits
    // Password is not required for registration - removed
    if (validatedData.publicurl || validatedData.public_url) {
      const url = validatedData.publicurl || validatedData.public_url;
      normalizedData.public_url = url.substring(0, 60);
    }
    if (validatedData.gender) {
      normalizedData.gender = validatedData.gender.substring(0, 2);
    }
    if (validatedData.dob) normalizedData.dob = validatedData.dob;
    if (validatedData.relationshipstatus || validatedData.relationship_status) {
      normalizedData.relationship_status = validatedData.relationshipstatus || validatedData.relationship_status;
    }
    if (validatedData.weddinganniversary || validatedData.wedding_anniversary) {
      normalizedData.wedding_anniversary = validatedData.weddinganniversary || validatedData.wedding_anniversary;
    }
    if (validatedData.add1) normalizedData.add1 = validatedData.add1.substring(0, 60);
    if (validatedData.add2) normalizedData.add2 = validatedData.add2.substring(0, 60);
    if (validatedData.add3) normalizedData.add3 = validatedData.add3.substring(0, 60);
    if (validatedData.add4) normalizedData.add4 = validatedData.add4.substring(0, 60);
    if (validatedData.aboutme || validatedData.about_me) {
      normalizedData.about_me = validatedData.aboutme || validatedData.about_me;
    }
    if (validatedData.facebook) normalizedData.facebook = validatedData.facebook.substring(0, 100);
    if (validatedData.twitter) normalizedData.twitter = validatedData.twitter.substring(0, 100);
    if (validatedData.linkedin) normalizedData.linkedin = validatedData.linkedin.substring(0, 100);
    if (validatedData.whatsapp) normalizedData.whatsapp = validatedData.whatsapp.substring(0, 20);
    if (validatedData.blog) normalizedData.blog = validatedData.blog.substring(0, 100);
    if (validatedData.tcclass || validatedData.tc_class) {
      const tcclass = validatedData.tcclass || validatedData.tc_class;
      normalizedData.tc_class = tcclass.substring(0, 6);
    }
    if (validatedData.contribution) normalizedData.contribution = validatedData.contribution;
    if (validatedData.stateid || validatedData.state_id) {
      normalizedData.state_id = validatedData.stateid || validatedData.state_id;
    }
    if (validatedData.organization) {
      // Organization field is limited to 5 characters in DB
      normalizedData.organization = validatedData.organization.substring(0, 5);
    }
    if (validatedData.organizerid || validatedData.organizer_id) {
      normalizedData.organizer_id = validatedData.organizerid || validatedData.organizer_id;
    }
    if (validatedData.userid || validatedData.user_id) {
      const userid = validatedData.userid || validatedData.user_id;
      normalizedData.user_id = userid.substring(0, 30);
    }
    if (validatedData.note) normalizedData.note = validatedData.note;

    const employee = await alumniModel.createAlumniEmployee(normalizedData);
    
    res.status(201).json({
      message: 'Alumni employee registered successfully. Your registration is pending approval.',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, type } = loginSchema.parse(req.body);
    const masterPassword = process.env.MASTER_PASSWORD || 'config#123';
    
    // Determine user type (default to 'student' for backward compatibility)
    const userType = type || 'student';
    
    if (userType === 'employee') {
      // Login for ex-employee
      const employee = await alumniModel.findEmployeeByEmail(email);
      if (!employee) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check master password or user's own password
      const isPasswordValid = password === masterPassword || 
        (employee.password && await alumniModel.verifyPassword(password, employee.password));
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: employee.alumni_id, email: employee.email_id, type: 'employee' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const { password: _, ...employeeData } = employee;

      res.json({
        message: 'Login successful',
        type: 'employee',
        alumni: employeeData,
        token
      });
    } else {
      // Login for alumni student (default)
      const student = await alumniModel.findStudentByEmail(email);
      if (!student) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check master password or user's own password
      const isPasswordValid = password === masterPassword || 
        (student.password && await alumniModel.verifyPassword(password, student.password));
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: student.alumni_id, email: student.email_id, type: 'student' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Update token in database
      await alumniModel.updateToken(student.alumni_id, token);

      const { password: _, ...studentData } = student;

      res.json({
        message: 'Login successful',
        type: 'student',
        alumni: studentData,
        token
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getStudentProfile = async (req, res, next) => {
  try {
    const student = await alumniModel.findStudentById(req.user.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const { password: _, ...studentData } = student;
    res.json({
      type: 'student',
      alumni: studentData
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeProfile = async (req, res, next) => {
  try {
    const employee = await alumniModel.findEmployeeById(req.user.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const { password: _, ...employeeData } = employee;
    res.json({
      type: 'employee',
      alumni: employeeData
    });
  } catch (error) {
    next(error);
  }
};

// Backward compatibility - determines user type and calls appropriate function
export const getProfile = async (req, res, next) => {
  try {
    // Check if user is student or employee based on ID format
    const userId = req.user.id;
    
    if (typeof userId === 'string' && userId.startsWith('S')) {
      // Student profile
      return getStudentProfile(req, res, next);
    } else if (typeof userId === 'string' && userId.startsWith('E')) {
      // Employee profile
      return getEmployeeProfile(req, res, next);
    } else {
      // Legacy support - try to determine from user type in token
      if (req.user.type === 'employee') {
        return getEmployeeProfile(req, res, next);
      } else {
        return getStudentProfile(req, res, next);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getAllAlumni = async (req, res, next) => {
  try {
    const filters = {
      name: req.query.name,
      tc_year: req.query.tc_year,
      tc_class: req.query.tc_class,
      state_id: req.query.state_id,
      school_id: req.query.school_id,
      status: req.query.status,
      public_display: req.query.public_display
    };

    const alumni = await alumniModel.getAllAlumniStudents(filters);
    res.json({
      count: alumni.length,
      alumni
    });
  } catch (error) {
    next(error);
  }
};

export const getAlumniById = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    // Validate ID format - accept student IDs (S1, S2, etc.) or employee IDs (E1, E2, etc.)
    if (!/^(S\d+|E\d+)$/.test(id)) {
      return res.status(400).json({ error: 'Invalid ID format. ID must be a student ID (S1, S2, etc.) or employee ID (E1, E2, etc.).' });
    }
    
    const alumni = await alumniModel.findAlumniById(id);
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }
    
    // Remove password from response if it exists
    const { password: _, ...alumniData } = alumni.data;
    
    res.json({
      type: alumni.type,
      alumni: alumniData
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudentProfile = async (req, res, next) => {
  try {
    console.log('=== UPDATE STUDENT PROFILE DEBUG ===');
    console.log('User from JWT:', req.user);
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    console.log('===================================');
    
    const validatedData = updateAlumniSchema.parse(req.body);
    const student = await alumniModel.updateAlumniStudent(req.user.id, validatedData);
    
    const { password: _, ...studentData } = student;
    
    res.json({
      message: 'Student profile updated successfully',
      type: 'student',
      alumni: studentData
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    next(error);
  }
};

export const updateEmployeeProfile = async (req, res, next) => {
  try {
    console.log('=== UPDATE EMPLOYEE PROFILE DEBUG ===');
    console.log('User from JWT:', req.user);
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    console.log('====================================');
    
    const validatedData = updateEmployeeSchema.parse(req.body);
    const employee = await alumniModel.updateAlumniEmployee(req.user.id, validatedData);
    
    const { password: _, ...employeeData } = employee;
    
    res.json({
      message: 'Employee profile updated successfully',
      type: 'employee',
      alumni: employeeData
    });
  } catch (error) {
    console.error('Update employee profile error:', error);
    next(error);
  }
};

// Get student profile by alumni_id from URL parameter
export const getStudentProfileById = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    
    // Validate alumni_id format (should start with 'S')
    if (!alumni_id.startsWith('S')) {
      return res.status(400).json({ error: 'Invalid student alumni_id format. Must start with "S"' });
    }
    
    console.log('=== GET STUDENT PROFILE BY ID ===');
    console.log('Alumni ID from URL:', alumni_id);
    console.log('User from JWT:', req.user);
    console.log('================================');
    
    const student = await alumniModel.findStudentById(alumni_id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const { password: _, ...studentData } = student;
    res.json({
      type: 'student',
      alumni: studentData
    });
  } catch (error) {
    console.error('Get student profile by ID error:', error);
    next(error);
  }
};

// Update student profile by alumni_id from URL parameter
export const updateStudentProfileById = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    
    // Validate alumni_id format (should start with 'S')
    if (!alumni_id.startsWith('S')) {
      return res.status(400).json({ error: 'Invalid student alumni_id format. Must start with "S"' });
    }
    
    console.log('=== UPDATE STUDENT PROFILE BY ID ===');
    console.log('Alumni ID from URL:', alumni_id);
    console.log('User from JWT:', req.user);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Email field value:', JSON.stringify(req.body.email_id));
    console.log('Email field type:', typeof req.body.email_id);
    console.log('===================================');
    
    try {
      const validatedData = updateAlumniSchema.parse(req.body);
      console.log('✅ Validation passed:', validatedData);
    } catch (validationError) {
      console.log('❌ Validation failed:', validationError.message);
      console.log('Validation errors:', validationError.errors);
      return res.status(400).json({
        error: 'Validation failed',
        details: validationError.errors.map(err => ({
          field: err.path.join('.') || 'unknown',
          message: err.message
        }))
      });
    }
    
    const validatedData = updateAlumniSchema.parse(req.body);
    
    // First check if student exists
    const existingStudent = await alumniModel.findStudentById(alumni_id);
    if (!existingStudent) {
      return res.status(404).json({ 
        error: 'Student not found',
        message: `No student found with alumni_id: ${alumni_id}`
      });
    }
    
    const student = await alumniModel.updateAlumniStudent(alumni_id, validatedData);
    
    const { password: _, ...studentData } = student;
    
    res.json({
      message: 'Student profile updated successfully',
      type: 'student',
      alumni: studentData
    });
  } catch (error) {
    console.error('Update student profile by ID error:', error);
    next(error);
  }
};

// Get employee profile by alumni_id from URL parameter
export const getEmployeeProfileById = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    
    // Validate alumni_id format (should start with 'E')
    if (!alumni_id.startsWith('E')) {
      return res.status(400).json({ error: 'Invalid employee alumni_id format. Must start with "E"' });
    }
    
    console.log('=== GET EMPLOYEE PROFILE BY ID ===');
    console.log('Alumni ID from URL:', alumni_id);
    console.log('User from JWT:', req.user);
    console.log('=================================');
    
    const employee = await alumniModel.findEmployeeById(alumni_id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const { password: _, ...employeeData } = employee;
    res.json({
      type: 'employee',
      alumni: employeeData
    });
  } catch (error) {
    console.error('Get employee profile by ID error:', error);
    next(error);
  }
};

// Update employee profile by alumni_id from URL parameter
export const updateEmployeeProfileById = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    
    // Validate alumni_id format (should start with 'E')
    if (!alumni_id.startsWith('E')) {
      return res.status(400).json({ error: 'Invalid employee alumni_id format. Must start with "E"' });
    }
    
    console.log('=== UPDATE EMPLOYEE PROFILE BY ID ===');
    console.log('Alumni ID from URL:', alumni_id);
    console.log('User from JWT:', req.user);
    console.log('Request body:', req.body);
    console.log('====================================');
    
    const validatedData = updateEmployeeSchema.parse(req.body);
    
    // First check if employee exists
    const existingEmployee = await alumniModel.findEmployeeById(alumni_id);
    if (!existingEmployee) {
      return res.status(404).json({ 
        error: 'Employee not found',
        message: `No employee found with alumni_id: ${alumni_id}`
      });
    }
    
    const employee = await alumniModel.updateAlumniEmployee(alumni_id, validatedData);
    
    const { password: _, ...employeeData } = employee;
    
    res.json({
      message: 'Employee profile updated successfully',
      type: 'employee',
      alumni: employeeData
    });
  } catch (error) {
    console.error('Update employee profile by ID error:', error);
    next(error);
  }
};

// Backward compatibility - determines user type and calls appropriate function
export const updateProfile = async (req, res, next) => {
  try {
    // Check if user is student or employee based on ID format
    const userId = req.user.id;
    
    if (typeof userId === 'string' && userId.startsWith('S')) {
      // Student update
      return updateStudentProfile(req, res, next);
    } else if (typeof userId === 'string' && userId.startsWith('E')) {
      // Employee update
      return updateEmployeeProfile(req, res, next);
    } else {
      // Legacy support - try to determine from user type in token
      if (req.user.type === 'employee') {
        return updateEmployeeProfile(req, res, next);
      } else {
        return updateStudentProfile(req, res, next);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photoPath = `/uploads/${req.file.filename}`;
    const student = await alumniModel.updateProfileImage(req.user.id, photoPath);

    res.json({
      message: 'Profile photo uploaded successfully',
      profile_image: student.profile_image
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await alumniModel.deleteAlumniStudent(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);

    // Import utilities
    const { generateStrongPassword } = await import('../utils/passwordGenerator.js');
    const { sendPasswordResetEmail } = await import('../utils/emailService.js');
    const bcrypt = await import('bcrypt');

    // Check if user exists (student or employee)
    const student = await alumniModel.findStudentByEmail(email);
    const employee = await alumniModel.findEmployeeByEmail(email);
    
    if (!student && !employee) {
      // Don't reveal if email exists or not for security
      return res.json({
        success: true,
        message: 'If the email is valid, a new password has been sent.'
      });
    }

    // Generate strong password (10-12 characters)
    const passwordLength = Math.floor(Math.random() * 3) + 10; // Random between 10-12
    const newPassword = generateStrongPassword(passwordLength);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password in database
    if (student) {
      await alumniModel.updateStudentPassword(email, hashedPassword);
    } else if (employee) {
      await alumniModel.updateEmployeePassword(email, hashedPassword);
    }
    
    // Send email with new password
    const emailResult = await sendPasswordResetEmail(email, newPassword);
    
    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error);
      // Still return success to not reveal email existence
    }

    res.json({
      success: true,
      message: 'If the email is valid, a new password has been sent.'
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    next(error);
  }
};
