import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(), // если в запросе будет почта проверить является ли она почтой
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
  }), // если больше 5 символов, то ок
  // body('fullName', 'Имя должно быть более 3 символов').isLength({min: 3}),
]

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(), // если в запросе будет почта проверить является ли она почтой
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
  }), // если больше 5 символов, то ок
  body('fullName', 'Имя должно быть более 3 символов').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), // если будет аватарка, проверить является ли она ссылкой
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тегов (перечисление через запятую)')
    .optional()
    .isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

export const productCreateValidation = [
  body('title', 'Введите заголовок товара').isLength({ min: 3 }).isString(),
  body('text', 'Введите описание товара').isLength({ min: 10 }).isString(),
  body('price', 'Введите стоимость товара'),
  body('tags', 'Неверный формат тегов (перечисление через запятую)')
    .optional()
    .isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

export const orderCreateValidation = [
  body('name', 'Введите имя').isLength({ min: 3 }).isString(),
  body('surname', 'Введите фамилию').isLength({ min: 3 }).isString(),
  body('middleName', 'Введите фамилию')
    .isLength({ min: 3 })
    .isString(),
]

export const reviewCreateValidation = [
  body('body', 'Напишите отзыв').isLength({ min: 3 }).isString(),
]