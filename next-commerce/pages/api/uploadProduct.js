import {connectToDatabase} from '../../utils/db'

const handler = async(req, res) => {
  const {db} = await connectToDatabase()
  const {name,price,stock_total,description,category,url} = req.body
  
    return db.collection('products')
      .insertOne({name,price,stock_total,description,category,image:url})
      .then(data => res.json(data.ops[0]))
      .catch(err => res.json(err))
  }

export default handler
  