import ReviewModel from '../../models/Review.js'
import ProductModel from '../../models/Product.js'

export const getAll = async (req, res) => {
  const _limit = req.query._limit ? parseInt(req.query._limit) : 8
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let reviewAll = null
    let reviewQuery = null

    reviewAll = await ReviewModel.find()
    reviewQuery = await ReviewModel.find()
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('product', 'title id')
      .exec()

    res.append('x-total-count', reviewAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(reviewQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить отзывы' })
  }
}

export const getAllProduct = async (req, res) => {
  const product = req.params.id
  const _limit = req.query._limit ? parseInt(req.query._limit) : 8
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let reviewAll = null
    let reviewQuery = null

    reviewAll = await ReviewModel.find({
      product: product,
      published: 'Одобрен',
    })
    reviewQuery = await ReviewModel.find({
      product: product,
      published: 'Одобрен',
    })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', reviewAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(reviewQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить отзывы' })
  }
}

export const getOne = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id)
    ReviewModel.findOne({ id: reviewId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить отзыв' })
      }
      if (!doc) return res.status(404).json({ message: 'Отзыв не найден' })
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить отзыв' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new ReviewModel({
      id: +new Date().getTime(),
      rating: req.body.rating,
      body: req.body.body,
      created: new Date().toLocaleString(),
      product: req.body.product,
      user: req.userId,
    })

    const review = await doc.save()
    res.json(review)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать отзыв' })
  }
}

export const update = async (req, res) => {
  try {
    await ReviewModel.updateOne(
      { id: req.body.id },
      {
        rating: req.body.rating,
        body: req.body.text,
        published: req.body.published,
        updated: new Date().toLocaleString(),
        product: req.body.productId,
        user: req.userId,
      }
    )

    if (req.body.published === 'Одобрен') {
      if (req.body.rating !== 0) {
        const reviewObj = await ReviewModel.find({ product: req.body.product })
        const rewiewArr = reviewObj.map((item) => item.rating)
        const rewiewArrNeed = rewiewArr.filter((item) => item !== 0)
        const ratingSum = rewiewArrNeed.reduce((a, b) => a + b)
        const ratingNumber = Math.ceil(ratingSum / rewiewArrNeed.length)
        ProductModel.findOneAndUpdate(
          { _id: req.body.product },
          { $set: { rating: ratingNumber } },
          (err, doc) => {
            if (err) {
              console.log(err)
              return res
                .status(500)
                .json({ message: 'Не удалось получить товар' })
            }
            if (!doc)
              return res.status(404).json({ message: 'Товар не найден' })
          }
        )
      }
    }
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить отзыв' })
  }
}

export const remove = async (req, res) => {
  try {
    const reviewId = req.params.id
    ReviewModel.findOneAndDelete({ id: reviewId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось удалить отзыв' })
      }
      if (!doc) return res.status(404).json({ message: 'Отзыв не найден' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить отзыв' })
  }
}
