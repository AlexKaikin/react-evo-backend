import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      id: +new Date().getTime(),
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarurl,
      passwordHash: hash,
    })
    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      { expiresIn: '30d' }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    ) // проверить сходятся ли пароли
    if (!isValidPass) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      { expiresIn: '30d' }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось авторизоваться',
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Нет доступа',
    })
  }
}

export const update = async (req, res) => {

  try {
    await UserModel.updateOne(
      { _id: req.userId },
      {
        avatarUrl: req.body.avatarUrl,
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить пользователя' })
  }
}

export const remove = async (req, res) => {
  try {
    UserModel.findOneAndDelete({ _id: req.userId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: 'Не удалось удалить пользователя' })
      }
      if (!doc)
        return res.status(404).json({ message: 'Пользователь не найден' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить пользователя' })
  }
}