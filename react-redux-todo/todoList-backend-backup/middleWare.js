import jwt from 'jsonwebtoken';
import { secret } from './token.js';

export const checkUser = async (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, secret, (err, verifiedJWT) => {
    if (verifiedJWT) {
      const { id: userId } = verifiedJWT;
      req.decodedUserId = userId;
    } else {
      next();
    }
  });
  next();
};
