import {validationResult} from 'express-validator' // импорт функции для проверки валидации


export default (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(errors.array()) // если есть ошибки
    next()
}