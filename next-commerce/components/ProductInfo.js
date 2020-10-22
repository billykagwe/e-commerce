import React, { useState, useCallback } from 'react'
import Modal from './Modal'
import AddProductForm from './AddProductForm'
import Link from 'next/link'
import useShow from '../hooks/useShow'
import useSWR from 'swr'
import fetchJson from '../utils/fetchJson'

function ProductInfo({product,toggleShow}) {
    const {image,name,description,price,_id} = product
    const {show,toggleShow:toggleDelete} = useShow()
    const {show:showForm,toggleShow:toggleForm} = useShow()
    const {data,mutate} = useSWR('/api/fetchProducts')

    const deleteProduct = (e) => {
        fetchJson(`/api/deleteProduct?id=${_id}`)
        .then((res) => {
            if(res.success){
                mutate(data.filter(prod => prod.id !== product.id))
                toggleShow(e)
            }
            else {
                //show warning
                console.log(res.success)
            }
        })
        //show error
        .catch((error) => console.log(error))
    }
       return <Modal>
           <>
          {!showForm && <div>
               <div className='flex justify-between px-3 items-center cursor-pointer'>
                <p className='text-2xl text-gray-600 text-center my-3'>{name}</p>
                <p onClick={toggleShow} className='text-xl'>x</p>
                </div>
                <div >
                    <img className='h-64 w-full rounded object-cover object-center' src={image} />
                    <button  className="p-2 mx-3 -mt-12 fixed rounded-full bg-blue-600 text-white  hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </button>
                </div>
                <p className='bg-blue-600 text-white -ml-8 w-32 p-2 mt-3 rounded-br-full'>Price: {price}</p>

                <div className='mt-1 pb-6 p-2'>
                    <p className='text-lg text-gray-700'>Description</p>
                    <p className='text-gray-500'>{description}</p>
                </div>
 
                <div className='flex justify-end'>
                {/* <Link href='/edit-product'>  */}
                <button onClick={toggleForm} className='w-24 bg-gray-600 text-gray-100 rounded m-2 p-2 font-medium hover:bg-gray-700 text-lg'>Edit</button>
                {/* </Link> */}
                <button onClick={toggleDelete} className='w-24 bg-red-100 text-red-600 rounded m-2 p-2 font-medium hover:bg-red-200 text-lg'>Delete</button>
                </div>
                {show && <p className='block border border-gray-200 p-2 text-gray-700 text-center mt-2'>Confirm Delete 
                <span onClick={deleteProduct} className='ml-3 w-12 text-center inline-block text-red-500 bg-red-100 p-1 rounded-md cursor-pointer hover:bg-red-200'>yes</span> 
                <span onClick={toggleDelete} className='ml-3 w-12 text-center inline-block text-blue-500 bg-blue-100 p-1 rounded-md cursor-pointer hover:bg-blue-200'>no</span></p>}

            </div>}
            {showForm && <AddProductForm toggleForm={toggleForm} editproduct={product} />}
           </> 
    </Modal> 
}

export default ProductInfo
