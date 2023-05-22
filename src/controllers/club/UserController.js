import UserModel from '../../models/User.js'

export const getAll = async (req, res) => {
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let usersAll = await UserModel.find()
    let usersQuery = null

    usersQuery = await UserModel.find()
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
    UserModel.findOneAndUpdate({ id: userId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: 'Не удалось получить пользователя' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Пользователь не найдена' })
      }
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить пользователя' })
  }
}
