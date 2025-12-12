import * as alumniModel from '../models/alumniModel.js';
import { 
  updateAlumniSchema, 
  loginSchema,
  registerStudentSchema,
  registerEmployeeSchema 
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
      fathername: validatedData.fathername || validatedData.father_name,
      mobileno: validatedData.mobileno || validatedData.mobile_no || validatedData.mobile_number,
      emailid: validatedData.emailid || validatedData.email_id || validatedData.email,
      empcode: validatedData.empcode || validatedData.employee_code,
      tcyear: validatedData.tcyear || validatedData.retirement_year,
    };
    
    // Validate required fields
    const errors = [];
    if (!normalizedData.name) {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (normalizedData.name.length > 30) {
      errors.push({ field: 'name', message: 'Name must be 30 characters or less' });
    }
    
    if (!normalizedData.fathername) {
      errors.push({ field: 'fathername', message: 'Father name is required' });
    } else if (normalizedData.fathername.length > 60) {
      errors.push({ field: 'fathername', message: 'Father name must be 60 characters or less' });
    }
    
    if (!normalizedData.mobileno) {
      errors.push({ field: 'mobileno', message: 'Mobile number is required' });
    } else if (normalizedData.mobileno.length !== 10) {
      errors.push({ field: 'mobileno', message: 'Mobile number must be exactly 10 digits' });
    }
    
    if (!normalizedData.emailid) {
      errors.push({ field: 'emailid', message: 'Email is required' });
    } else if (normalizedData.emailid.length > 60) {
      errors.push({ field: 'emailid', message: 'Email must be 60 characters or less' });
    }
    
    if (!normalizedData.empcode) {
      errors.push({ field: 'empcode', message: 'Employee code is required' });
    } else if (normalizedData.empcode.length > 25) {
      errors.push({ field: 'empcode', message: 'Employee code must be 25 characters or less' });
    }
    
    if (!normalizedData.tcyear) {
      errors.push({ field: 'tcyear', message: 'Retirement year is required' });
    } else if (normalizedData.tcyear.length > 60) {
      errors.push({ field: 'tcyear', message: 'Retirement year must be 60 characters or less' });
    }
    
    if (!req.file) {
      errors.push({ field: 'photo', message: 'Profile photo is required' });
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    
    // Check if email exists
    const existingEmail = await alumniModel.findEmployeeByEmail(normalizedData.emailid);
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Check if employee code exists
    const existingCode = await alumniModel.findEmployeeByCode(normalizedData.empcode);
    if (existingCode) {
      return res.status(409).json({ error: 'Employee code already exists' });
    }

    // Add profile image - store only filename (max 30 chars in DB)
    // Truncate filename if too long
    const filename = req.file.filename;
    normalizedData.profileimage = filename.length > 30 ? filename.substring(0, 30) : filename;
    
    // Add optional fields if present with length limits
    // Password is not required for registration - removed
    if (validatedData.publicurl || validatedData.public_url) {
      const url = validatedData.publicurl || validatedData.public_url;
      normalizedData.publicurl = url.substring(0, 60);
    }
    if (validatedData.gender) {
      normalizedData.gender = validatedData.gender.substring(0, 2);
    }
    if (validatedData.dob) normalizedData.dob = validatedData.dob;
    if (validatedData.relationshipstatus || validatedData.relationship_status) {
      normalizedData.relationshipstatus = validatedData.relationshipstatus || validatedData.relationship_status;
    }
    if (validatedData.weddinganniversary || validatedData.wedding_anniversary) {
      normalizedData.weddinganniversary = validatedData.weddinganniversary || validatedData.wedding_anniversary;
    }
    if (validatedData.add1) normalizedData.add1 = validatedData.add1.substring(0, 60);
    if (validatedData.add2) normalizedData.add2 = validatedData.add2.substring(0, 60);
    if (validatedData.add3) normalizedData.add3 = validatedData.add3.substring(0, 60);
    if (validatedData.add4) normalizedData.add4 = validatedData.add4.substring(0, 60);
    if (validatedData.aboutme || validatedData.about_me) {
      normalizedData.aboutme = validatedData.aboutme || validatedData.about_me;
    }
    if (validatedData.facebook) normalizedData.facebook = validatedData.facebook.substring(0, 100);
    if (validatedData.twitter) normalizedData.twitter = validatedData.twitter.substring(0, 100);
    if (validatedData.linkedin) normalizedData.linkedin = validatedData.linkedin.substring(0, 100);
    if (validatedData.whatsapp) normalizedData.whatsapp = validatedData.whatsapp.substring(0, 20);
    if (validatedData.blog) normalizedData.blog = validatedData.blog.substring(0, 100);
    if (validatedData.tcclass || validatedData.tc_class) {
      const tcclass = validatedData.tcclass || validatedData.tc_class;
      normalizedData.tcclass = tcclass.substring(0, 6);
    }
    if (validatedData.contribution) normalizedData.contribution = validatedData.contribution;
    if (validatedData.stateid || validatedData.state_id) {
      normalizedData.stateid = validatedData.stateid || validatedData.state_id;
    }
    if (validatedData.organization) {
      // Organization field is limited to 5 characters in DB
      normalizedData.organization = validatedData.organization.substring(0, 5);
    }
    if (validatedData.organizerid || validatedData.organizer_id) {
      normalizedData.organizerid = validatedData.organizerid || validatedData.organizer_id;
    }
    if (validatedData.userid || validatedData.user_id) {
      const userid = validatedData.userid || validatedData.user_id;
      normalizedData.userid = userid.substring(0, 30);
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
        { id: employee.alumniid, email: employee.emailid, type: 'employee' },
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

export const getProfile = async (req, res, next) => {
  try {
    const student = await alumniModel.findStudentById(req.user.id);
    if (!student) {
      return res.status(404).json({ error: 'Alumni not found' });
    }
    const { password: _, ...studentData } = student;
    res.json(studentData);
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
    const student = await alumniModel.findStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Alumni not found' });
    }
    const { password: _, ...studentData } = student;
    res.json(studentData);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const validatedData = updateAlumniSchema.parse(req.body);
    const student = await alumniModel.updateAlumniStudent(req.user.id, validatedData);
    
    const { password: _, ...studentData } = student;
    
    res.json({
      message: 'Profile updated successfully',
      alumni: studentData
    });
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
