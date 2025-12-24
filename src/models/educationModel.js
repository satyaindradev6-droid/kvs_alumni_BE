import prisma from '../config/prisma.js';

export const createEducation = async (alumni_id, data) => {
  return await prisma.alumni_educations.create({
    data: {
      alumni_id,
      grade: data.grade,
      program: data.program,
      institute: data.institute,
      location: data.location,
      start_date: data.start_date ? new Date(data.start_date) : null,
      end_date: data.end_date ? new Date(data.end_date) : null,
      is_deleted: 0
    }
  });
};

export const getEducationsByAlumniId = async (alumni_id) => {
  return await prisma.alumni_educations.findMany({
    where: {
      alumni_id,
      is_deleted: 0
    },
    orderBy: {
      start_date: 'desc'
    }
  });
};

export const getEducationById = async (id, alumni_id) => {
  const educationId = parseInt(id);
  
  if (isNaN(educationId)) {
    return null;
  }
  
  return await prisma.alumni_educations.findFirst({
    where: {
      id: educationId,
      alumni_id,
      is_deleted: 0
    }
  });
};

export const updateEducation = async (id, alumni_id, data) => {
  const educationId = parseInt(id);
  
  if (isNaN(educationId)) {
    throw new Error('Invalid education ID');
  }
  
  const updateData = {};
  
  if (data.grade !== undefined) updateData.grade = data.grade;
  if (data.program !== undefined) updateData.program = data.program;
  if (data.institute !== undefined) updateData.institute = data.institute;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.start_date !== undefined) updateData.start_date = data.start_date ? new Date(data.start_date) : null;
  if (data.end_date !== undefined) updateData.end_date = data.end_date ? new Date(data.end_date) : null;

  return await prisma.alumni_educations.update({
    where: {
      id: educationId
    },
    data: updateData
  });
};

export const deleteEducation = async (id, alumni_id) => {
  const educationId = parseInt(id);
  
  if (isNaN(educationId)) {
    throw new Error('Invalid education ID');
  }
  
  return await prisma.alumni_educations.update({
    where: {
      id: educationId
    },
    data: {
      is_deleted: 1
    }
  });
};
