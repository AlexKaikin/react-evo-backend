import RoomModel from '../../models/club/Room.js'
import UserModel from '../../models/User.js'

export const getAll = async (req, res) => {
  const my_id = req.userId
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let roomAll = await RoomModel.find({
      $and: [{users: { $in: [my_id] }}, { lastMessage: { $ne: '' } }],
    })
    let roomQuery = null

    roomQuery = await RoomModel.find({
      $and: [{ users: { $in: [my_id] } }, { lastMessage: { $ne: '' } }],
    })
      .sort({ updated: 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('users', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', roomAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(roomQuery.reverse())
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить комнаты' })
  }
}

export const searchUser = async (req, res) => {
  const my_id = req.userId
  const userName = req.query.name ? req.query.name : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 1000
  const _page = req.query._page ? parseInt(req.query._page) : 1

function getParams() {
  const filter = {}

  filter.$and = [
    { subscribers: { $in: [my_id] } },
    { subscriptionsUser: { $in: [my_id] } },
  ]

  if (userName) filter.$and.push({ fullName: new RegExp(userName, 'i') })
  
  return filter
}

  try {
    let usersAll = await UserModel.find(getParams())
    let usersQuery = null

    usersQuery = await UserModel.find(getParams())
      .sort({ updated: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    res.append('x-total-count', usersAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(usersQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить пользователя' })
  }
}

export const getOne = async (req, res) => {
  try {
    const my_id = req.userId
    const user_id = req.params.user_id

    RoomModel.findOne({ users: { $all: [my_id, user_id] } }, async (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить комнату' })
      }

      if (!doc) {
        
          const newRoom = new RoomModel({
            id: new Date().getTime(),
            users: [my_id, user_id],
            lastMessage: '',
            created: new Date().getTime(),
            updated: new Date().getTime(),
          })

          const room = await newRoom.save()

          return res.json(room)

      }

      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заметку' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new RoomModel({
      id: req.body.id,
      users: req.body.users,
      created: new Date().getTime(),
      updated: new Date().getTime(),
    })

    const note = await doc.save()
    res.json(note)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать комнату' })
  }
}

export const update = async (req, res) => {
  try {
    await RoomModel.updateOne(
      { id: req.body.id },
      {
        id: req.body.id,
        users: req.body.users,
        created: req.body.created,
        updated: new Date().getTime(),
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить комнату' })
  }
}

export const remove = async (req, res) => {
  try {
    const noteId = req.params.noteId
    RoomModel.findOneAndDelete({ id: noteId }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось удалить комнату' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Комната не найдена' })
      }
      res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить комнату' })
  }
}
