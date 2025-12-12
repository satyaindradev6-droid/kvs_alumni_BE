import { z } from 'zod';

// Alumni Student Registration Schema (Updated for new table structure)
export const registerStudentSchema = z.object({
  // Required fields
  name: z.string().optional(),
  father_name: z.string().optional(),
  mobile_no: z.string().optional(),
  mobile_number: z.string().optional(),
  email_id: z.string().optional(),
  state_id: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  school_id: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  tc_year: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') return parseInt(val, 10);
    return val;
  }, z.number().int().optional()),
  tc_class: z.string().optional(),
  profile_image: z.string().optional(),
  
  // Optional fields
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  admission_no: z.string().optional(),
  public_url: z.string().optional(),
  public_display: z.preprocess((val) => {
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (val === true || val === 'true' || val === '1') return 'true';
    if (val === false || val === 'false' || val === '0') return 'false';
    return val;
  }, z.string().optional()),
  gender: z.string().optional(),
  dob: z.string().optional(), // Will be converted to Date
  relationship_status: z.string().optional(),
  wedding_anniversary: z.string().optional(), // Will be converted to Date
  add1: z.string().optional(),
  add2: z.string().optional(),
  add3: z.string().optional(),
  add4: z.string().optional(),
  role: z.string().optional(),
  about_me: z.string().optional(),
  experties: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  whatsapp: z.string().optional(),
  blog: z.string().optional(),
  contribution: z.string().optional(),
  ro_id: z.union([z.number(), z.string().transform(Number)]).pipe(z.number().int()).optional(),
  user_id: z.union([z.number(), z.string().transform(Number)]).pipe(z.number().int()).optional(),
  note: z.string().optional(),
  status: z.string().optional(),
  created_by: z.union([z.number(), z.string().transform(Number)]).pipe(z.number().int()).optional(),
});

// Ex-Employee Registration Schema
export const registerEmployeeSchema = z.object({
  // Mandatory fields - make them optional for validation, handle in controller
  name: z.string().optional(),
  fathername: z.string().optional(),
  father_name: z.string().optional(),
  mobileno: z.string().optional(),
  mobile_no: z.string().optional(),
  mobile_number: z.string().optional(),
  emailid: z.string().optional(),
  email_id: z.string().optional(),
  email: z.string().optional(),
  empcode: z.string().optional(),
  employee_code: z.string().optional(),
  tcyear: z.string().optional(),
  retirement_year: z.string().optional(),
  
  // Optional fields
  password: z.string().optional(),
  publicurl: z.string().optional(),
  public_url: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  relationshipstatus: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  relationship_status: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  weddinganniversary: z.string().optional(),
  wedding_anniversary: z.string().optional(),
  add1: z.string().optional(),
  add2: z.string().optional(),
  add3: z.string().optional(),
  add4: z.string().optional(),
  aboutme: z.string().optional(),
  about_me: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  whatsapp: z.string().optional(),
  blog: z.string().optional(),
  tcclass: z.string().optional(),
  tc_class: z.string().optional(),
  contribution: z.string().optional(),
  stateid: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  state_id: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  organization: z.string().optional(),
  organizerid: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  organizer_id: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().int().optional()),
  userid: z.string().optional(),
  user_id: z.string().optional(),
  note: z.string().optional(),
  retired_from: z.string().optional(),
});

export const updateAlumniSchema = z.object({
  public_url: z.string().optional(),
  public_display: z.preprocess((val) => {
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (val === true || val === 'true' || val === '1') return 'true';
    if (val === false || val === 'false' || val === '0') return 'false';
    return val;
  }, z.string().optional()),
  admission_no: z.string().optional(),
  name: z.string().min(2).optional(),
  mobile_no: z.string().optional(),
  email_id: z.string().email().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  relationship_status: z.string().optional(),
  wedding_anniversary: z.string().optional(),
  add1: z.string().optional(),
  add2: z.string().optional(),
  add3: z.string().optional(),
  add4: z.string().optional(),
  role: z.string().optional(),
  father_name: z.string().optional(),
  about_me: z.string().optional(),
  experties: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  whatsapp: z.string().optional(),
  blog: z.string().optional(),
  tc_year: z.number().int().optional(),
  tc_class: z.string().optional(),
  contribution: z.string().optional(),
  state_id: z.number().int().optional(),
  ro_id: z.number().int().optional(),
  school_id: z.number().int().optional(),
  user_id: z.number().int().optional(),
  note: z.string().optional(),
  status: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  type: z.enum(['student', 'employee']).optional(), // 'student' for alumni, 'employee' for ex-employee
});
