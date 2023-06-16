import UserModel from '../../models/User.js'
import GroupModel from '../../models/club/Group.js'
import NoteModel from '../../models/club/Note.js'

export const getAll = async (req, res) => {
  const user_id = req.userId
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  const users = await UserModel.find({subscribers: { $in: [user_id] }})

  const groups = await GroupModel.find({subscribers: { $in: [user_id] }})

  function getParams() {
    return [...users.map((user) => user._id), ...groups.map((group) => group._id)]
  }

  try {
    let eventAll = await NoteModel.find({
      $or: [{ user: { $in: getParams() } }, { group: { $in: getParams() } }],
    })
    let eventQuery = null

    eventQuery = await NoteModel.find({
      $or: [{ user: { $in: getParams() } }, { group: { $in: getParams() } }],
    })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .populate('group', 'title avatarUrl')
      .exec()

    res.append('x-total-count', eventAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(eventQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить события' })
  }
}

export const getOne = async (req, res) => {
  try {
    const noteId = parseInt(req.params.noteId)
    NoteModel.findOneAndUpdate({ id: noteId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить событие' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Событие не найдено' })
      }
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить событие' })
  }
}
