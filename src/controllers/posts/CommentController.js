import PostModel from '../../models/posts/Post.js'
import CommentModel from '../../models/posts/Comment.js'

export const getAll = async (req, res) => {
  const _limit = req.query._limit ? parseInt(req.query._limit) : 8
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let commentAll = null
    let commentQuery = null

    commentAll = await CommentModel.find({ user: req.userId })
    commentQuery = await CommentModel.find({ user: req.userId })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('product', 'title id')
      .exec()

    res.append('x-total-count', commentAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(commentQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить комментарии' })
  }
}

export const getAllPost = async (req, res) => {
  const post = req.params.id
  const _limit = req.query._limit ? parseInt(req.query._limit) : 8
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let commentAll = null
    let commentQuery = null

    commentAll = await CommentModel.find({
      post: post,
      published: 'Одобрен',
    })
    commentQuery = await CommentModel.find({
      post: post,
      published: 'Одобрен',
    })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', commentAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(commentQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить комментарии' })
  }
}

export const getOne = async (req, res) => {
  try {
    const postID = parseInt(req.params.id)
    CommentModel.findOne({ id: postID }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить комментарий' })
      }
      if (!doc) return res.status(404).json({ message: 'Комментарий не найден' })
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить комментарий' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      id: +new Date().getTime(),
      body: req.body.body,
      created: new Date().getTime(),
      post: req.body.post,
      user: req.userId,
    })

    const comment = await doc.save()
    res.json(comment)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать комментарий' })
  }
}

export const update = async (req, res) => {
  try {
    await CommentModel.updateOne(
      { id: req.body.id },
      {
        body: req.body.text,
        published: req.body.published,
        updated: new Date().getTime(),
        product: req.body.productId,
        user: req.userId,
      }
    )

    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить комментарий' })
  }
}

export const remove = async (req, res) => {
  try {
    const commentID = req.params.id
    CommentModel.findOneAndDelete({ id: commentID }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось удалить комментарий' })
      }
      if (!doc) return res.status(404).json({ message: 'Комментарий не найден' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить комментарий' })
  }
}
