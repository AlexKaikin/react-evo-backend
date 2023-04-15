import NavigationModel from '../models/Navigation.js'

export const get = async (req, res) => {
  try {
    const navigation = await NavigationModel.find()
    res.json(navigation)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить навигацию' })
  }
}


export const getOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    NavigationModel.findOneAndUpdate(
      { id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res
            .status(500)
            .json({ message: 'Не удалось получить навигацию' })
        }
        if (!doc)
          return res.status(404).json({ message: 'Навигация не найдена' })
        res.json(doc)
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить навигацию' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new NavigationModel({
      id: req.body.id,
      title: req.body.title,
      url: req.body.url,
      filter: req.body.filter,
      sort: req.body.sort,
    })

    const item = await doc.save()
    res.json(item)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать ссылку' })
  }
}

export const update = async (req, res) => {
  try {
    await NavigationModel.updateOne(
      { id: req.body.id },
      {
        title: req.body.title,
        url: req.body.url,
        filter: req.body.filter,
        sort: req.body.sort
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить навигацию' })
  }
}

export const remove = async (req, res) => {
  try {
    const id = req.params.id
    NavigationModel.findOneAndDelete({ id }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Не удалось часть навигации' })
      }
      if (!doc) return res.status(404).json({ message: 'Навигация не найдена' })
      return res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось часть навигации' })
  }
}
