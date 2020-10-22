import {Task} from '../utils/types'
import fetchJson from './fetchJson'

const updateProduct = (product) => Task((rej,res) => {
    fetchJson('/api/updateProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(result => res(result))
    .catch(err => rej(err))

}) 

export default updateProduct