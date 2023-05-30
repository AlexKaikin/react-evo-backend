import mongoose from 'mongoose'
import UserModel from '../../models/User.js'

export const getAll = async (req, res) => {
  const user_id = req.userId
  const q = req.query.q ? req.query.q : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  function getFilter() {
    const filter = {}
    filter._id = { $ne: mongoose.Types.ObjectId(user_id) }
    if(q) filter.fullName = new RegExp(q, 'i')

    return filter
  }

  try {
    let usersAll = await UserModel.find(getFilter())
    let usersQuery = null

    usersQuery = await UserModel.find(getFilter())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    res.append('x-total-count', usersAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(usersQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить пользователей' })
  }
}


export const getOne = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    UserModel.findOne({ id: userId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: 'Не удалось получить пользователя' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить пользователя' })
  }
}
