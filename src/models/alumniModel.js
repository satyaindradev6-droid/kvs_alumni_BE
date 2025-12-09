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
    where: { alumni_id: parseInt(alumni_id) },
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
    where.tc_year = parseInt(filters.tc_year);
  }
  if (filters.tc_class) {
    where.tc_class = { contains: filters.tc_class, mode: 'insensitive' };
  }
  if (filters.state_id) {
    where.state_id = parseInt(filters.state_id);
  }
  if (filters.school_id) {
    where.school_id = parseInt(filters.school_id);
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
  
  return await prisma.alumni_students.update({
    where: { alumni_id: parseInt(alumni_id) },
    data,
    select: alumniStudentSelect,
  });
};

// Soft delete alumni student
export const deleteAlumniStudent = async (alumni_id) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: parseInt(alumni_id) },
    data: { is_deleted: 'true', updated_at: new Date() },
    select: { alumni_id: true },
  });
};

// Update profile image
export const updateProfileImage = async (alumni_id, imagePath) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: parseInt(alumni_id) },
    data: { profile_image: imagePath, updated_at: new Date() },
    select: { alumni_id: true, profile_image: true },
  });
};

// Update token
export const updateToken = async (alumni_id, token) => {
  return await prisma.alumni_students.update({
    where: { alumni_id: parseInt(alumni_id) },
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

// ============ ALUMNI EMPLOYEE FUNCTIONS ============

// Field selection for alumni_employee
const alumniEmployeeSelect = {
  alumniid: true,
  uuid: true,
  publicurl: true,
  empcode: true,
  name: true,
  mobileno: true,
  emailid: true,
  profileimage: true,
  gender: true,
  dob: true,
  relationshipstatus: true,
  weddinganniversary: true,
  add1: true,
  add2: true,
  add3: true,
  add4: true,
  role: true,
  fathername: true,
  aboutme: true,
  facebook: true,
  twitter: true,
  linkedin: true,
  whatsapp: true,
  blog: true,
  tcyear: true,
  tcclass: true,
  contribution: true,
  stateid: true,
  organization: true,
  organizerid: true,
  userid: true,
  note: true,
  status: true,
  isdeleted: true,
  createdby: true,
  createdat: true,
  updatedat: true,
};

// Create alumni employee
export const createAlumniEmployee = async (employeeData) => {
  const { password, dob, weddinganniversary, ...rest } = employeeData;
  let data = { 
    ...rest,
    role: 2, // Default role for employee
    status: 0, // Pending approval
    isdeleted: 0,
    createdby: 0,
    stateid: rest.stateid || 0, // Default to 0 if not provided (required field)
  };
  
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }
  
  // Convert date strings to Date objects
  if (dob) {
    data.dob = new Date(dob);
  }
  if (weddinganniversary) {
    data.weddinganniversary = new Date(weddinganniversary);
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
export const findEmployeeByEmail = async (emailid) => {
  return await prisma.alumni_employee.findFirst({
    where: { emailid, isdeleted: 0 },
  });
};

// Find employee by employee code
export const findEmployeeByCode = async (empcode) => {
  return await prisma.alumni_employee.findFirst({
    where: { empcode, isdeleted: 0 },
  });
};

// Find employee by ID
export const findEmployeeById = async (alumniid) => {
  return await prisma.alumni_employee.findUnique({
    where: { alumniid: parseInt(alumniid) },
    select: alumniEmployeeSelect,
  });
};
