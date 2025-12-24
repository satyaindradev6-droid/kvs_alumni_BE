import * as experienceModel from '../models/experienceModel.js';
import { createExperienceSchema, updateExperienceSchema } from '../validations/experienceValidation.js';

// Get all experiences (admin/public view)
export const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await experienceModel.getAllExperiences();
    
    res.json({
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// Create new experience
export const createExperience = async (req, res, next) => {
  try {
    const validatedData = createExperienceSchema.parse(req.body);
    const experience = await experienceModel.createExperience(req.user.id, validatedData);
    
    res.status(201).json({
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// Get all experiences for logged-in alumni
export const getMyExperiences = async (req, res, next) => {
  try {
    const experiences = await experienceModel.getExperiencesByAlumniId(req.user.id);
    
    res.json({
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// Get experiences by alumni_id (from URL parameter)
export const getExperiencesByAlumniId = async (req, res, next) => {
  try {
    const { alumni_id } = req.params;
    const experiences = await experienceModel.getExperiencesByAlumniId(alumni_id);
    
    res.json({
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// Get single experience by ID (public - no ownership check)
export const getExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await experienceModel.getExperienceById(id);
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json({ data: experience });
  } catch (error) {
    next(error);
  }
};

// Update experience
export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = updateExperienceSchema.parse(req.body);
    
    // Check if experience exists and belongs to user
    const existing = await experienceModel.getExperienceById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    const experience = await experienceModel.updateExperience(id, req.user.id, validatedData);
    
    res.json({
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// Delete experience (soft delete)
export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if experience exists and belongs to user
    const existing = await experienceModel.getExperienceById(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    await experienceModel.deleteExperience(id, req.user.id);
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};
