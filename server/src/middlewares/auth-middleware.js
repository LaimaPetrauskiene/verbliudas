import { decodeToken } from '../helpers/token-helpers.js';

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403).json({ message: 'Auth required' });
    return;
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    res.status(400).json({ message: 'Bad Auth Data format' });
    return;
  }

  try {
    req.user = decodeToken(token);
    next();
  }
  catch (err) {
    res.status(400).json({ message: 'Bad token' });
  }
}

export default authMiddleware;