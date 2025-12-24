import { z } from 'zod';

export const createExperienceSchema = z.object({
  designation: z.string().max(100).optional(),
  company_name: z.string().max(150).optional(),
  location: z.string().max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const updateExperienceSchema = z.object({
  designation: z.string().max(100).optional(),
  company_name: z.string().max(150).optional(),
  location: z.string().max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});
