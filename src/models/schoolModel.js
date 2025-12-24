import prisma from '../config/prisma.js';

// Get all unique states
export const getAllStates = async () => {
  const states = await prisma.master_schools_kvs.findMany({
    where: {
      state_id: { not: null },
      state_name: { not: null }
    },
    select: {
      state_id: true,
      state_name: true
    },
    distinct: ['state_id']
  });
  
  return states.sort((a, b) => a.state_name.localeCompare(b.state_name));
};

// Get state by state_id
export const getStateById = async (state_id) => {
  return await prisma.master_schools_kvs.findFirst({
    where: { 
      state_id,
      state_id: { not: null },
      state_name: { not: null }
    },
    select: {
      state_id: true,
      state_name: true
    }
  });
};

// Get schools by state_id
export const getSchoolsByStateId = async (state_id) => {
  return await prisma.master_schools_kvs.findMany({
    where: { state_id },
    select: {
      id: true,
      school_id: true,
      school_name: true,
      state_id: true,
      state_name: true,
      ro_id: true,
      ro_name: true,
      kv_id: true,
      kv_name: true,
      email_id: true,
      contact_no: true,
      website: true,
      district_id: true,
      district_name: true,
      city: true,
      postal_address_1: true,
      postal_address_2: true,
      postal_address_3: true,
      pin_code: true,
      shift: true,
      status: true,
      longitude: true,
      latitude: true,
      establishment_year: true,
      udise_code: true,
      cbse_school_code: true,
      classes_availability: true
    },
    orderBy: { school_name: 'asc' }
  });
};

// Get school by ID
export const getSchoolById = async (id) => {
  return await prisma.master_schools_kvs.findUnique({
    where: { id: parseInt(id) }
  });
};

// Get school by school_id
export const getSchoolBySchoolId = async (school_id) => {
  return await prisma.master_schools_kvs.findFirst({
    where: { school_id }
  });
};

// Get all schools with optional filters
export const getAllSchools = async (filters = {}) => {
  const where = {};

  if (filters.state_id) {
    where.state_id = filters.state_id;
  }
  if (filters.district_id) {
    where.district_id = filters.district_id;
  }
  if (filters.ro_id) {
    where.ro_id = filters.ro_id;
  }
  if (filters.school_name) {
    where.school_name = { contains: filters.school_name, mode: 'insensitive' };
  }
  if (filters.status) {
    where.status = filters.status;
  }

  return await prisma.master_schools_kvs.findMany({
    where,
    orderBy: { school_name: 'asc' }
  });
};
