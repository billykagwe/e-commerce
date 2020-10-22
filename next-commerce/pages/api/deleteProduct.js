import {connectToDatabase} from '../../utils/db'
import { ObjectID } from 'mongodb'

export default async(req, res) => {
    const {db} = await connectToDatabase()
    const {id} = req.query

    return db.collection('products')
              .deleteOne({"_id":ObjectID(id)})
              .then(result => result.deletedCount ? res.json({success: true}) : res.json({success:false}))
              .catch(err => res.json({success:false}))
    
  }
  


