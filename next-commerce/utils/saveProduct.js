import {projectStorage} from "../firebase/config";
import {Task} from '../utils/types'

const saveImage = ({pic}) => 
    Task((rej,res) => {
        const storageRef = projectStorage.ref(pic.name); 
        storageRef.put(pic)
        .then(snapshot => storageRef.getDownloadURL()) 
        .then(url => res(url))
        .catch(err => rej('failed to upload image'))
    })

//mongodb+srv://billy:<password>@cluster0.zdb8v.mongodb.net/<dbname>?retryWrites=true&w=majority

const saveProductData = ({name,price,stock_total,description,category,db})=>
    //references
    Task((rej,res) => {
      db.collection('products')
      .insertOne({name,price,stock_total,description,category,image:url})
      .then(data => res(data))
      .catch(err => rej(err))
    })

const saveProduct = ({name,price,stock_total,description,category,pic,db}) => 
                        saveImage({pic})
                        .chain(saveProductData({name,price,stock_total,description,category,db}))

export default saveProduct