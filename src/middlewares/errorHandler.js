export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Record already exists' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referenced record does not exist' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
