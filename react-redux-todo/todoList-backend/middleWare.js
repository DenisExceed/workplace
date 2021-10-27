import { secret } from "./token.js";
import jwt from 'jsonwebtoken';

export const checkUser = async (req, res, next) => {

  const { token } = req.headers;
  
  const payload = jwt.verify(token, secret, (err, verifiedJWT) => {

    if (verifiedJWT) {
      const { id: userId } = verifiedJWT;
      req.decodedUserId = userId;
    } else {
      next();
    }
  });
  next();
}
