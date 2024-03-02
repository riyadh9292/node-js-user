// eslint-disable-next-line no-unused-vars
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
};

export default notFoundMiddleware;
