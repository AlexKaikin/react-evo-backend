import ProductModel from '../../models/Product.js'

export const getAll = async (req, res) => {
  const q = req.query.q ? req.query.q : null
  const category = req.query.category ? req.query.category : null
  const _sort = req.query._sort ? req.query._sort : null
  const _order = req.query._order ? req.query._order : null
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let productAll = null
    let productQuery = null

    if (q && category) {
      productAll = await ProductModel.find({
        title: new RegExp(q, 'i'),
        category: category,
        published: true,
        quantity: { $gte: 1 },
      })
      productQuery = await ProductModel.find({
        title: new RegExp(q, 'i'),
        category: category,
        published: true,
        quantity: { $gte: 1 },
      })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else if (category) {
      productAll = await ProductModel.find({
        category,
        published: true,
        quantity: { $gte: 1 },
      })
      productQuery = await ProductModel.find({
        category,
        published: true,
        quantity: { $gte: 1 },
      })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else if (q) {
      productAll = await ProductModel.find({
        title: new RegExp(q, 'i'),
        published: true,
        quantity: { $gte: 1 },
      })
      productQuery = await ProductModel.find({
        title: new RegExp(q, 'i'),
        published: true,
        quantity: { $gte: 1 },
      })
        .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
        .limit(_limit)
        .skip(_limit * (_page - 1))
        .populate('user')
        .exec()
    } else {
      productAll = await ProductModel.find({
        published: true,
        quantity: { $gte: 1 },
      })
      productQuery = await ProductModel.find({
        published: true,
        quantity: { $gte: 1 },
      })
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
    const productId = parseInt(req.params.id)
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
    const doc = new ProductModel({
      id: +new Date().getTime(),
      title: req.body.title,
      text: req.body.text,
      imgUrl: req.body.imgUrl,
      galleryUrl: req.body.galleryUrl,
      price: req.body.price,
      quantity: req.body.quantity,
      currency: req.body.currency,
      tags: req.body.tags,
      category: req.body.category,
      volume: req.body.volume,
      volumeMeasurement: req.body.volumeMeasurement,
      property: req.body.property,
      published: req.body.published,
      created: new Date().toLocaleString(),
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
    //const productId = req.params.id
    await ProductModel.updateOne(
      { id: req.body.id },
      {
        title: req.body.title,
        text: req.body.text,
        imgUrl: req.body.imgUrl,
        galleryUrl: req.body.galleryUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        currency: req.body.currency,
        tags: req.body.tags,
        category: req.body.category,
        volume: req.body.volume,
        volumeMeasurement: req.body.volumeMeasurement,
        property: req.body.property,
        published: req.body.published,
        updated: new Date().toLocaleString(),
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
    ProductModel.findOneAndDelete({ id: productId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось удалить товар' })
      }
      if (!doc) return res.status(404).json({ message: 'Товар не найден' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить товар' })
  }
}
