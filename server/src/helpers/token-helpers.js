import jwt from 'jsonwebtoken';

export const createToken = (data) => jwt.sign(data, process.env.TOKEN_SECRET);

export const decodeToken = (token) => jwt.verify(token, process.env.TOKEN_SECRET);