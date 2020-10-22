import React from 'react'

function Input({value,changeHandler,type='text',placeholder,name ,required=false}) {
    return (
        <div className=' mt-4 mb-1'>
        <label className='block text-gray-600 capitalize'>{placeholder}</label>
        <input min={0} required={required} name={name} className='border border-gray-200 rounded p-1 w-full focus:border-gray-200 text-gray-600' value={value} onChange={changeHandler} type={type}  />
        </div>
    )
}

export default Input
