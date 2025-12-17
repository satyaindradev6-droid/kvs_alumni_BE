import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

// Field selection for alumni_students
const alumniStudentSelect = {
  alumni_id: true,
  uuid: true,
  public_url: true,
  public_display: true,
  admission_no: true,
  name: true,
  mobile_no: true,
  email_id: true,
  profile_image: true,
  gender: true,
  dob: true,
  relationship_status: true,
  wedding_anniversary: true,
  add1: true,
  add2: true,
  add3: true,
  add4: true,
  role: true,
  father_name: true,
  about_me: true,
  experties: true,
  facebook: true,
  twitter: true,
  linkedin: true,
  whatsapp: true,
  blog: true,
  tc_year: true,
  tc_class: true,
  contribution: true,
  state_id: true,
  ro_id: true,
  school_id: true,
  user_id: true,
  note: true,
  status: true,
  is_deleted: true,
  created_by: true,
  created_at: true,
  updated_at: true,
};

// Alumni Student Registration
export const createAlumniStudent = async (studentData) => {
  const { password, dob, wedding_anniversary, ...rest } = studentData;
  let data = { ...rest };
  
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }
  
  // Convert date strings to Date objects
  if (dob) {
    data.dob = new Date(dob);
  }
  if (wedding_anniversary) {
    data.wedding_anniversary = new Date(wedding_anniversary);
  }
  
  return await prisma.alumni_students.create({
    data,
    select: alumniStudentSelect,
  });
};

// Find student by email
export const findStudentByEmail = async (email_id) => {
  return await prisma.alumni_students.findFirst({
    where: { email_id, is_deleted: 'false' },
  });
};

// Find student by ID
export const findStudentById = async (alumni_id) => {
  return await prisma.alumni_students.findUnique({
    where: { alumni_id: alumni_id },
    select: alumniStudentSelect,
  });
};

// Find student by UUID
export const findStudentByUuid = async (uuid) => {
  return await prisma.alumni_students.findFirst({
    where: { uuid, is_deleted: 'false' },
    select: alumniStudentSelect,
  });
};

// Get all alumni students with filters
export const getAllAlumniStudents = async (filters = {}) => {
  const where = { is_deleted: 'false' };

  if (filters.name) {
    where.name = { contains: filters.name, mode: 'insensitive' };
  }
  if (filters.tc_year) {
    const tcYear = parseInt(filters.tc_year);
    if (!isNaN(tcYear)) {
      where.tc_year = tcYear;
    }
  }
  if (filters.tc_class) {
    where.tc_class = { contains: filters.tc_class, mode: 'insensitive' };
  }
  if (filters.state_id) {
    const stateId = parseInt(filters.state_id);
    if (!isNaN(stateId)) {
      where.state_id = stateId;
    }
  }
  if (filters.school_id) {
    const schoolId = parseInt(filters.school_id);
    if (!isNaN(schoolId)) {
      where.school_id = schoolId;
    }
  }
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.public_display !== undefined) {
    where.public_display = filters.public_display;
  }

  return await prisma.alumni_students.findMany({
    where,
    select: alumniStudentSelect,
    orderBy: { created_at: 'desc' },
  });
};

// Update alumni student
export const updateAlumniStudent = async (alumni_id, updateData) => {
  console.log('=== UPDATE ALUMNI STUDENT MODEL ===');
  console.log('Alumni ID:', alumni_id);
  console.log('Update Data:', updateData);
  console.log('==================================');
  
  const { password, dob, wedding_anniversary, ...rest } = updateData;
  let data = { ...rest, updated_at: new Date() };
  
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }
  
  // Convert date strings to Date objects
  if (dob) {
    data.dob = new Date(dob);
  }
  if (wedding_anniversary) {
    data.wedding_anniversary = new Date(wedding_anniversary);
  }
  
  console.log('Final data to update:', data);
  
  return await prisma.alumni_students.update({
    where: { alumni_id: alumni_id },
    data,
    select: alumniStudentSelect,
  });
};

// Soft delete alumni student
export const deleteAlumniStudent = async (alumni_id) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: alumni_id },
    data: { is_deleted: 'true', updated_at: new Date() },
    select: { alumni_id: true },
  });
};

// Update profile image
export const updateProfileImage = async (alumni_id, imagePath) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: alumni_id },
    data: { profile_image: imagePath, updated_at: new Date() },
    select: { alumni_id: true, profile_image: true },
  });
};

// Update token
export const updateToken = async (alumni_id, token) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: alumni_id },
    data: { token, updated_at: new Date() },
    select: { alumni_id: true },
  });
};

// Find by public URL
export const findByPublicUrl = async (public_url) => {
  return await prisma.alumni_students.findFirst({
    where: { public_url, is_deleted: 'false', public_display: 'true' },
    // select: alumniStudentSelect,
  });
};

// Verify password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Update password for student
export const updateStudentPassword = async (email_id, hashedPassword) => {
  return await prisma.alumni_students.updateMany({
    where: { 
      email_id, 
      is_deleted: 'false' 
    },
    data: { 
      password: hashedPassword, 
      updated_at: new Date() 
    },
  });
};

// Update password for employee
export const updateEmployeePassword = async (email_id, hashedPassword) => {
  return await prisma.alumni_employee.updateMany({
    where: { 
      email_id, 
      is_deleted: 0 
    },
    data: { 
      password: hashedPassword, 
      updated_at: new Date() 
    },
  });
};

// ============ ALUMNI EMPLOYEE FUNCTIONS ============

// Field selection for alumni_employee
const alumniEmployeeSelect = {
  alumni_id: true,
  uuid: true,
  public_url: true,
  emp_code: true,
  name: true,
  mobile_no: true,
  email_id: true,
  profile_image: true,
  gender: true,
  dob: true,
  relationship_status: true,
  wedding_anniversary: true,
  add1: true,
  add2: true,
  add3: true,
  add4: true,
  role: true,
  father_name: true,
  about_me: true,
  facebook: true,
  twitter: true,
  linkedin: true,
  whatsapp: true,
  blog: true,
  tc_year: true,
  tc_class: true,
  contribution: true,
  state_id: true,
  organization: true,
  organizer_id: true,
  user_id: true,
  note: true,
  status: true,
  is_deleted: true,
  created_by: true,
  created_at: true,
  updated_at: true,
};

// Create alumni employee
export const createAlumniEmployee = async (employeeData) => {
  const { password, dob, wedding_anniversary, ...rest } = employeeData;
  let data = { 
    ...rest,
    role: 2, // Default role for employee
    status: 0, // Pending approval
    is_deleted: 0,
    created_by: 0,
    state_id: rest.state_id || 0, // Default to 0 if not provided (required field)
  };
  
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }
  
  // Convert date strings to Date objects
  if (dob) {
    data.dob = new Date(dob);
  }
  if (wedding_anniversary) {
    data.wedding_anniversary = new Date(wedding_anniversary);
  }
  
  // Log data with field lengths for debugging
  console.log('=== DATABASE INSERT DATA ===');
  Object.keys(data).forEach(key => {
    const value = data[key];
    const length = typeof value === 'string' ? value.length : 'N/A';
    console.log(`${key}: "${value}" (length: ${length})`);
  });
  console.log('===========================');
  
  return await prisma.alumni_employee.create({
    data,
    select: alumniEmployeeSelect,
  });
};

// Find employee by email
export const findEmployeeByEmail = async (email_id) => {
  return await prisma.alumni_employee.findFirst({
    where: { email_id, is_deleted: 0 },
  });
};

// Find employee by employee code
export const findEmployeeByCode = async (emp_code) => {
  return await prisma.alumni_employee.findFirst({
    where: { emp_code, is_deleted: 0 },
  });
};

// Find employee by ID
export const findEmployeeById = async (alumni_id) => {
  return await prisma.alumni_employee.findUnique({
    where: { alumni_id: alumni_id },
    select: alumniEmployeeSelect,
  });
};

// Update alumni employee
export const updateAlumniEmployee = async (alumni_id, updateData) => {
  console.log('=== UPDATE ALUMNI EMPLOYEE MODEL ===');
  console.log('Alumni ID:', alumni_id);
  console.log('Update Data:', updateData);
  console.log('===================================');
  
  const { password, dob, wedding_anniversary, ...rest } = updateData;
  let data = { ...rest, updated_at: new Date() };
  
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }
  
  // Convert date strings to Date objects
  if (dob) {
    data.dob = new Date(dob);
  }
  if (wedding_anniversary) {
    data.wedding_anniversary = new Date(wedding_anniversary);
  }
  
  console.log('Final data to update:', data);
  
  return await prisma.alumni_employee.update({
    where: { alumni_id: alumni_id },
    data,
    select: alumniEmployeeSelect,
  });
};

// Find alumni by ID (searches both student and employee tables)
export const findAlumniById = async (id) => {
  // First try to find in students table (ID is string like "S1", "S2")
  if (typeof id === 'string' && id.startsWith('S')) {
    const student = await prisma.alumni_students.findUnique({
      where: { alumni_id: id },
      select: alumniStudentSelect,
    });
    
    if (student) {
      return {
        type: 'student',
        data: student
      };
    }
  }
  
  // Try employees table (ID is string like "E1", "E2")
  if (typeof id === 'string' && id.startsWith('E')) {
    const employee = await prisma.alumni_employee.findUnique({
      where: { alumni_id: id },
      select: alumniEmployeeSelect,
    });
    
    if (employee) {
      return {
        type: 'employee',
        data: employee
      };
    }
  }
  
  return null;
};
