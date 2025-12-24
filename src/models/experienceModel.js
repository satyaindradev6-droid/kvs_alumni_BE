import prisma from '../config/prisma.js';

export const getAllExperiences = async () => {
  return await prisma.alumni_experiences.findMany({
    where: {
      is_deleted: 0
    },
    orderBy: {
      created_at: 'desc'
    }
  });
};

export const createExperience = async (alumni_id, data) => {
  return await prisma.alumni_experiences.create({
    data: {
      alumni_id,
      designation: data.designation,
      company_name: data.company_name,
      location: data.location,
      start_date: data.start_date ? new Date(data.start_date) : null,
      end_date: data.end_date ? new Date(data.end_date) : null,
      is_deleted: 0
    }
  });
};

export const getExperiencesByAlumniId = async (alumni_id) => {
  return await prisma.alumni_experiences.findMany({
    where: {
      alumni_id,
      is_deleted: 0
    },
    orderBy: {
      start_date: 'desc'
    }
  });
};

export const getExperienceById = async (id, alumni_id = null) => {
  const experienceId = parseInt(id);
  
  if (isNaN(experienceId)) {
    return null;
  }
  
  const where = {
    id: experienceId,
    is_deleted: 0
  };
  
  // Only filter by alumni_id if provided
  if (alumni_id) {
    where.alumni_id = alumni_id;
  }
  
  return await prisma.alumni_experiences.findFirst({
    where
  });
};

export const updateExperience = async (id, alumni_id, data) => {
  const experienceId = parseInt(id);
  
  if (isNaN(experienceId)) {
    throw new Error('Invalid experience ID');
  }
  
  const updateData = {};
  
  if (data.designation !== undefined) updateData.designation = data.designation;
  if (data.company_name !== undefined) updateData.company_name = data.company_name;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.start_date !== undefined) updateData.start_date = data.start_date ? new Date(data.start_date) : null;
  if (data.end_date !== undefined) updateData.end_date = data.end_date ? new Date(data.end_date) : null;

  return await prisma.alumni_experiences.update({
    where: {
      id: experienceId
    },
    data: updateData
  });
};

export const deleteExperience = async (id, alumni_id) => {
  const experienceId = parseInt(id);
  
  if (isNaN(experienceId)) {
    throw new Error('Invalid experience ID');
  }
  
  return await prisma.alumni_experiences.update({
    where: {
      id: experienceId
    },
    data: {
      is_deleted: 1
    }
  });
};
