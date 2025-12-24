import * as educationModel from '../models/educationModel.js';
import { createEducationSchema, updateEducationSchema } from '../validations/educationValidation.js';

// Create new education
export const createEducation = async (req, res, next) => {
  try {
    const validatedData = createEducationSchema.parse(req.body);
    const education = await educationModel.createEducation(req.user.id, validatedData);
    
    res.status(201).json({
      message: 'Education created successfully',
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// Get all educations for logged-in alumni
export const getMyEducations = async (req, res, next) => {
  try {
    const educations = await educationModel.getEducationsByAlumniId(req.user.id);
    
    res.json({
      count: educations.length,
      data: educations
    });
  } catch (error) {
    next(error);
  }
};

// Get educations by alumni_id (from URL parameter)
export const getEducationsByAlumniId = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    const educations = await educationModel.getEducationsByAlumniId(alumni_id);
    
    res.json({
      count: educations.length,
      data: educations
    });
  } catch (error) {
    next(error);
  }
};

// Get single education by ID
export const getEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const education = await educationModel.getEducationById(id, req.user.id);
    
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    
    res.json({ data: education });
  } catch (error) {
    next(error);
  }
};

// Update education
export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = updateEducationSchema.parse(req.body);
    
    // Check if education exists and belongs to user
    const existing = await educationModel.getEducationById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Education not found' });
    }
    
    const education = await educationModel.updateEducation(id, req.user.id, validatedData);
    
    res.json({
      message: 'Education updated successfully',
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// Delete education (soft delete)
export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if education exists and belongs to user
    const existing = await educationModel.getEducationById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Education not found' });
    }
    
    await educationModel.deleteEducation(id, req.user.id);
    
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    next(error);
  }
};
