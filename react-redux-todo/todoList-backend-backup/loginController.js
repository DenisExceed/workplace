import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './login/User.js';
import { secret } from './token.js';

const generateAccessToken = (id, username) => {
  const payload = { id, username };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class loginController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }

      const { username, password } = req.body;

      const preUser = await User.findOne({ username });

      if (preUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({ username, password: hashPassword });

      await user.save();

      const token = generateAccessToken(user.username);

      return res.json({
        message: 'Пользователь успешно зарегистрирован',
        token,
        userId: user._id,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const userId = user._id;

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введён неверный пароль' });
      }

      const token = generateAccessToken(user._id);
      return res.json({ token, userId });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async checkToken(req, res) {
    try {
      const checkUser = { isUser: false, userId: 0 };
      if (req.decodedUserId) {
        const user = await User.findById(req.decodedUserId);

        if (user) {
          checkUser.isUser = true;
          checkUser.userId = user._id;
        }
      }

      return res.send(checkUser);
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new loginController();
