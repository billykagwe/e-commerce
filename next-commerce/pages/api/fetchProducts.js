import {connectToDatabase} from '../../utils/db'

export default async(req, res) => {
  const {db} = await connectToDatabase()
  
  return db.collection('products')
  .find({})
  .toArray()
  .then(data => res.json(data))
  .catch(err => res.json(err))


  }
  