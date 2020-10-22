import React,{useState, useEffect} from 'react'
import Input from './Input'
import useStorage from '../hooks/useStorage'
import useSWR from 'swr'
import fetchJson from '../utils/fetchJson'
import updateProduct from '../utils/updateProduct'

function AddProductForm({toggleForm,editproduct}) {
    const initialState = {
        name: '',
        price: 0,
        stock_total: 0,
        description: '',
        pic:null,
        category: ''
    }
    const [product,setProduct] = useState({...initialState})
    const [error,setError] = useState('')
    const [response,setResponse] = useState(null)
    const {mutate,data:products} = useSWR('/api/fetchProducts')

    const validImageTypes = ["image/png", "image/jpeg"]

    const showResponse = (response) => {
        setResponse(response)
        setTimeout(() => {
            setResponse(null)
        },3000)
    }

    const successUpdate = (result) => {
        if(result.success){
            showResponse({msg:'Update Success',type:'success'})
            mutate(products.map(prod => prod._id === editproduct._id ? product : prod))
        }
    }

    const uploadSuccess = (newData) => {
            showResponse({msg:'Update Success',type:'success'})
            mutate([...products,newData])
            setProduct(initialState)
    }

    const handleError = () => {
        showResponse({msg:'Update Failed',type:'success'})
    }

 
    useEffect(() => {
       editproduct ? setProduct(editproduct) : setProduct(initialState)
    },[editproduct])

    const {name,price,stock_total,description,pic,category} = product
    
    const submitHandler = (e) => {
        e.preventDefault()

        editproduct ? 

        updateProduct(product)
            .fork(handleError,successUpdate)

        : useStorage({name,price,stock_total,description,file:pic,category,successUpdate})
            .fork(handleError,uploadSuccess)

        // toggleForm(e)
      }
    const changeHandler = (e) => {
        const {name,value} = e.target
        setProduct({...product,[name]:value})
    }

    const fileHandler = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        if (selectedFile && validImageTypes.includes(selectedFile.type)) {
            setProduct({...product,pic:selectedFile})
            setError(null);
        } else {
            setProduct({...product,pic:null})
            setError("Please select an image of type (png,jpeg)");
        }
    }
    return (
        <div className='shadow w-full p-4'>
        <p onClick={toggleForm} className='text-gray-600 font-semibold text-lg text-center mb-3 cursor-pointer'>X</p>
        {error && <p className='text-red-500'>{error}</p>}
        {response && <p className={`${response.type === 'success' ? 'bg-green-600' : 'bg-red-600'} p-2 text-white`}>{response.msg}</p>}
         <form onSubmit={submitHandler}>
            <Input name={'name'} placeholder='Product name' value={name} changeHandler={changeHandler} />
            <Input  required={false} placeholder='Product Image'  changeHandler={fileHandler} type='file' />
            <Input name={'price'} placeholder='Product price' value={price} changeHandler={changeHandler} type='number'/>
            <Input name={'category'} placeholder='Product category' value={category} changeHandler={changeHandler} />
            <Input name={'stock_total'} placeholder='stock total' value={stock_total} changeHandler={changeHandler} type='number'/>
            <Input name={'description'} placeholder='Product description' value={description} changeHandler={changeHandler} />
            <button className='rounded-lg mt-5 bg-blue-600 text-white cursor-pointer p-2 w-32 mx-auto block' type='submit'>Submit</button>
        </form>
      
        </div>
    )
}

export default AddProductForm
