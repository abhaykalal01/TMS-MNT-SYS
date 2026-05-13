import { z } from 'zod';

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long')
    .trim(),
  description: z.string()
    .max(500, 'Description must be at most 500 characters long')
    .optional(),
  status: z.enum(['pending', 'in-progress', 'completed'])
    .optional()
    .default('pending'),
  dueDate: z.string()
    .datetime('Invalid date format')
    .optional()
    .refine((date) => {
      if (date) {
        return new Date(date) > new Date();
      }
      return true;
    }, 'Due date must be in the future')
});

// Schema for updating an existing task
export const updateTaskSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long')
    .trim()
    .optional(),
  description: z.string()
    .max(500, 'Description must be at most 500 characters long')
    .optional(),
  status: z.enum(['pending', 'in-progress', 'completed'])
    .optional(),
  dueDate: z.string()
    .datetime('Invalid date format')
    .optional()
    .refine((date) => {
      if (date) {
        return new Date(date) > new Date();
      }
      return true;
    }, 'Due date must be in the future')
});

// Schema for task ID validation (used in routes)
export const taskIdSchema = z.object({
  id: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format')
});

// Validation middleware function for body
export const validateTask = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
  };
};

// Validation middleware function for params
export const validateTaskParams = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
  };
};