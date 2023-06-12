import mongoose from 'mongoose'
import GroupModel from '../../models/club/Group.js'
import UserModel from '../../models/User.js'

export const getAll = async (req, res) => {
  const q = req.query.q ? req.query.q : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  function getFilter() {
    const filter = {}
    if (q) filter.title = new RegExp(q, 'i')

    return filter
  }

  try {
    let groupAll = await GroupModel.find(getFilter())
    let groupQuery = null

    groupQuery = await GroupModel.find(getFilter())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('creator', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', groupAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(groupQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить группы' })
  }
}

export const getOne = async (req, res) => {
  try {
    const groupId = parseInt(req.params.id)
    GroupModel.findOne({ id: groupId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить группу' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Группа не найдена' })
      }
      res.json(doc)
    })
      .populate('subscribers', 'id fullName avatarUrl')

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить группу' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new GroupModel({
      id: +new Date().getTime(),
      title: req.body.title,
      about: req.body.about,
      location: req.body.location,
      avatarUrl: req.body.avatarUrl,
      subscribers: [],
      private: req.body.private,
      created: new Date().getTime(),
      creator: req.userId,
    })

    const group = await doc.save()
    res.json(group)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать группу' })
  }
}

export const update = async (req, res) => {
  try {
    await GroupModel.updateOne(
      { id: req.body.id },
      {
        title: req.body.title,
        about: req.body.about,
        location: req.body.location,
        avatarUrl: req.body.avatarUrl,
        private: req.body.private,
        updated: new Date().toLocaleString(),
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить группу' })
  }
}

export const remove = async (req, res) => {
  try {
    const groupId = req.params.id
    GroupModel.findOneAndDelete({ id: groupId }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось удалить группу' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Группа не найдена' })
      }
      res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить группу' })
  }
}

export const followGroup = async (req, res) => {
  const user_id = req.userId
  const followGroup_id = req.params._id

  try {
    await UserModel.updateOne(
      { _id: user_id },
      { $push: { subscriptionsGroup: mongoose.Types.ObjectId(followGroup_id) } }
    )

    await GroupModel.updateOne(
      { _id: mongoose.Types.ObjectId(followGroup_id) },
      { $push: { subscribers: mongoose.Types.ObjectId(user_id) } }
    )

    res.json({ success: true, user_id: user_id })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось подписаться' })
  }
}

export const unFollowGroup = async (req, res) => {
  const user_id = req.userId
  const unFollowGroup_id = req.params._id

  try {
    await UserModel.updateOne(
      { _id: user_id },
      { $pull: { subscriptionsGroup: mongoose.Types.ObjectId(unFollowGroup_id) } }
    )

    await GroupModel.updateOne(
      { _id: mongoose.Types.ObjectId(unFollowGroup_id) },
      { $pull: { subscribers: mongoose.Types.ObjectId(user_id) } }
    )

    res.json({ success: true, user_id: user_id })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось отписаться' })
  }
}
