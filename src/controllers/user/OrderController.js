import OrderModel from '../../models/Order.js'

export const getAll = async (req, res) => {
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    const orderAll = await OrderModel.find({ user: req.userId })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .exec()

    res.append('x-total-count', orderAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(orderAll)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заказы' })
  }
}

export const getOne = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id)
    OrderModel.findOneAndUpdate({ id: orderId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось получить заказ' })
      }
      if (!doc) return res.status(404).json({ message: 'Заказ не найден' })
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заказ' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new OrderModel({
      id: +new Date().getTime(),
      name: req.body.name,
      surname: req.body.surname,
      middleName: req.body.middleName,
      region: req.body.region,
      city: req.body.city,
      street: req.body.street,
      home: req.body.home,
      index: req.body.index,
      created: new Date().toLocaleString(),
      cartItems: req.body.cartItems,
      totalCost: req.body.totalCost,
      user: req.userId,
    })

    const order = await doc.save()
    res.json(order)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать заказ' })
  }
}

export const update = async (req, res) => {
  try {
    await OrderModel.updateOne(
      { id: req.body.id },
      {
        name: req.body.name,
        surname: req.body.surname,
        middleName: req.body.middleName,
        region: req.body.region,
        city: req.body.city,
        street: req.body.street,
        home: req.body.home,
        index: req.body.index,
        cartItems: req.body.cartItems,
        updated: new Date().toLocaleString(),
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить заказ' })
  }
}

export const remove = async (req, res) => {
  try {
    const orderId = req.params.id
    OrderModel.findOneAndDelete({ id: orderId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось удалить заказ' })
      }
      if (!doc) return res.status(404).json({ message: 'Заказ не найден' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить заказ' })
  }
}
