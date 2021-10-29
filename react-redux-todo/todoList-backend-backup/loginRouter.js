import { Router } from 'express';
import { check } from 'express-validator';
import loginController from './loginController.js';
import { checkUser } from './middleWare.js';

const router = new Router();

router.post('/registration', [
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть больше 3 символов').isLength({ min: 3 }),
], loginController.registration);

router.post('/login', loginController.login);
router.post('/token', [checkUser], loginController.checkToken);

export default router;
