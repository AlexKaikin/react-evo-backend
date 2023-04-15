import PostModel from '../../models/Post.js'

export const getAll = async (req, res) => {
  const q = req.query.q ? req.query.q : null
  const category = req.query.category ? req.query.category : null
  const _sort = req.query._sort ? req.query._sort : null
  const _order = req.query._order ? req.query._order : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let postAll = null
    let postQuery = null

    if (category) {
      postAll = await PostModel.find({
        category,
      })
      postQuery = await PostModel.find({
        category,
      })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else if (q) {
      postAll = await PostModel.find({
        title: new RegExp(q, 'i'),
      })
      postQuery = await PostModel.find({
        title: new RegExp(q, 'i'),
      })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else {
      postAll = await PostModel.find({})
      postQuery = await PostModel.find({})
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    }
    res.append('x-total-count', postAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(postQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить статьи' })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)
    PostModel.findOneAndUpdate(
      { id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Не удалось получить статью' })
        }
        if (!doc) {
          return res.status(404).json({ message: 'Статья не найдена' })
        }
        res.json(doc)
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить статью' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      id: +new Date().getTime(),
      title: req.body.title,
      category: req.body.category,
      text: req.body.text,
      imgUrl: req.body.imgUrl,
      galleryUrl: req.body.galleryUrl,
      tags: req.body.tags,
      published: req.body.published,
      created: new Date().toLocaleString(),
      user: req.userId,
    })

    const post = await doc.save()
    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать статью' })
  }
}

export const update = async (req, res) => {
  try {
    await PostModel.updateOne(
      { id: req.body.id },
      {
        title: req.body.title,
        category: req.body.category,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        published: req.body.published,
        updated: new Date().toLocaleString(),
        user: req.userId,
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить статью' })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id
    PostModel.findOneAndDelete({ id: postId }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось удалить статью' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Статья не найдена' })
      }
      res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить статью' })
  }
}
