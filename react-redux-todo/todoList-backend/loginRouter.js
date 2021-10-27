import { Router } from "express";
import loginController from "./loginController.js";
import { checkUser } from "./middleWare.js";
import { check } from "express-validator";

const router = new Router()

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 3 символов").isLength( { min:3 } ),
], loginController.registration)

router.post('/login', loginController.login)
router.post('/token', [checkUser], loginController.checkToken)

export default router;