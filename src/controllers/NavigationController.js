import NavigationModel from '../models/Navigation.js'


export const get = async (req, res) => {
    try{
        const navigation = await NavigationModel.find()
        res.json(navigation)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Не удалось получить навигацию'})
    }
}

export const create = async (req, res) => {
    try{
        const doc = new NavigationModel({
            id: req.body.id,
            title: req.body.title,
            url: req.body.url,
            filter: req.body.filter,
            sort: req.body.sort
        })

        const item = await doc.save()
        res.json(item)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Не удалось создать ссылку'})
    }
}
