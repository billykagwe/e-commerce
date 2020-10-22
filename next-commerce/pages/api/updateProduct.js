import {connectToDatabase} from '../../utils/db'
import { ObjectID } from 'mongodb'

export default async(req, res) => {
    const {_id,...updateValues}  = req.body
    const {db} = await connectToDatabase()

    return db.collection('products')
             .updateOne(
                 {"_id": ObjectID(_id)},
                 {$set:{...updateValues}}
             )
             .then(result => res.json({success : !!result.modifiedCount} ))
             .catch(err => res.json({success:false}))
  }
   


