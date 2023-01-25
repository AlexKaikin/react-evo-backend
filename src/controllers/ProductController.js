import ProductModel from '../models/Product.js'

export const getAll = async (req, res) => {
  const category = req.query.category ? req.query.category : null
  const _sort = req.query._sort ? req.query._sort : null
  const _order = req.query._order ? req.query._order : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let productAll = null
    let productQuery = null

    if (category === null) {
      productAll = await ProductModel.find()
      productQuery = await ProductModel.find()
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else {
      productAll = await ProductModel.find({ category })
      productQuery = await ProductModel.find({ category })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    }

    res.append('x-total-count', productAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(productQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить товары' })
  }
}

export const getOne = async (req, res) => {
  try {
    const productId = +req.params.id
    ProductModel.findOneAndUpdate(
      { id: productId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Не удалось получить товар' })
        }
        if (!doc) return res.status(404).json({ message: 'Товар не найден' })
        res.json(doc)
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить товар' })
  }
}

export const create = async (req, res) => {
  try {
    const date = new Date()
    const doc = new ProductModel({
      id: +new Date().getTime(),
      title: req.body.title,
      text: req.body.text,
      imgUrl: req.body.imgUrl,
      galleryUrl: req.body.galleryUrl,
      price: req.body.price,
      currency: req.body.currency,
      tags: req.body.tags,
      category: req.body.category,
      volume: req.body.volume,
      volumeMeasurement: req.body.volumeMeasurement,
      property: req.body.property,
      created: date.toLocaleString(),
      user: req.userId,
    })

    const product = await doc.save()
    res.json(product)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать товар' })
  }
}

export const update = async (req, res) => {
  try {
    const зroductId = req.params.id
    await ProductModel.updateOne(
      { _id: зroductId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        tags: req.body.tags,
        user: req.userId,
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить товар' })
  }
}

export const remove = async (req, res) => {
  try {
    const productId = req.params.id
    ProductModel.findOneAndDelete({ _id: productId }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось удалить товар' })
      }
      if (!doc) res.status(404).json({ message: 'Товар не найден' })
      res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить товар' })
  }
}
