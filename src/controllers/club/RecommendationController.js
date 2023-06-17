import UserModel from '../../models/User.js'

export const getAll = async (req, res) => {
  const user_id = req.userId
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  const myProfile = await UserModel.findOne({ _id: user_id })

  try {
    let recommendationAll = await UserModel.find({
      $and: [
        {
          interests: { $in: myProfile.interests },
        },
        { _id: { $ne: myProfile._id } },
        { subscribers: { $ne: myProfile._id } },
      ],
    })
    let recommendationQuery = null

    recommendationQuery = await UserModel.find({
      $and: [
        {
          interests: { $in: myProfile.interests },
        },
        { _id: { $ne: myProfile._id } },
        { subscribers: { $ne: myProfile._id } },
      ],
    })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    res.append('x-total-count', recommendationAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(recommendationQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить рекомендации' })
  }
}
