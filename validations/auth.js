import {body} from 'express-validator'

export const registerValidator = [
  body("email", "Неверная почта").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "имя минимум 3 символов").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const loginValidator = [
  body("email", "Неверная почта").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
  // body("fullName", "имя минимум 3 символов").isLength({ min: 3 }),
  // body("avatarUrl", "Неверная ссылка").optional().isURL(),
];