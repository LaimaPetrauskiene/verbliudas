const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
    return;
  }

  res.status(403).json({
    message: 'You must be logged in as ADMIN'
  });
}

export default adminMiddleware;