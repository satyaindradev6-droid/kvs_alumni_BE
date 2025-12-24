import { z } from 'zod';

export const createEducationSchema = z.object({
  grade: z.string().max(50).optional(),
  program: z.string().max(100).optional(),
  institute: z.string().max(150).optional(),
  location: z.string().max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const updateEducationSchema = z.object({
  grade: z.string().max(50).optional(),
  program: z.string().max(100).optional(),
  institute: z.string().max(150).optional(),
  location: z.string().max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});
