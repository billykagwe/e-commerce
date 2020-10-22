import React, { useState } from 'react'
import Modal from './Modal';
import AddProductForm from './AddProductForm';
import useShow from '../hooks/useShow';


// name,price,pic,stock total,description,available_colors

function AddProduct() {
    const {show,toggleShow} = useShow()
    return (
        <div>
           {show && <Modal>
                <AddProductForm toggleForm={toggleShow}/>
            </Modal>}
            <button onClick={toggleShow}
                className=" fixed bottom-0 left-0 ml-3 sm:ml-12 mb-6 p-0 w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          {!show &&<svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
          </svg>}
          {show &&<svg  viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block mr-1 mb-1">
                <path fill="#FFFFFF" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>}
        </button>
        </div>
    )
}

export default AddProduct
