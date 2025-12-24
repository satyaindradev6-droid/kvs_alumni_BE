import * as schoolModel from '../models/schoolModel.js';

// Get all states
export const getAllStates = async (req, res, next) => {
  try {
    const states = await schoolModel.getAllStates();
    res.json({
      message: 'States fetched successfully',
      count: states.length,
      data: states
    });
  } catch (error) {
    next(error);
  }
};

// Get state by state_id
export const getStateById = async (req, res, next) => {
  try {
    const { state_id } = req.params;
    
    if (!state_id) {
      return res.status(400).json({ error: 'State ID is required' });
    }

    const state = await schoolModel.getStateById(state_id);
    
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json({
      message: 'State fetched successfully',
      data: state
    });
  } catch (error) {
    next(error);
  }
};

// Get schools by state_id
export const getSchoolsByState = async (req, res, next) => {
  try {
    const { state_id } = req.params;
    
    if (!state_id) {
      return res.status(400).json({ error: 'State ID is required' });
    }

    const schools = await schoolModel.getSchoolsByStateId(state_id);
    
    res.json({
      message: 'Schools fetched successfully',
      state_id,
      count: schools.length,
      data: schools
    });
  } catch (error) {
    next(error);
  }
};

// Get school by ID
export const getSchoolById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const school = await schoolModel.getSchoolById(id);
    
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.json({
      message: 'School fetched successfully',
      data: school
    });
  } catch (error) {
    next(error);
  }
};

// Get all schools with filters
export const getAllSchools = async (req, res, next) => {
  try {
    const filters = {
      state_id: req.query.state_id,
      district_id: req.query.district_id,
      ro_id: req.query.ro_id,
      school_name: req.query.school_name,
      status: req.query.status
    };

    const schools = await schoolModel.getAllSchools(filters);
    
    res.json({
      message: 'Schools fetched successfully',
      count: schools.length,
      data: schools
    });
  } catch (error) {
    next(error);
  }
};
