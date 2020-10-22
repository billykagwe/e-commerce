import React, { useState } from 'react'

function useInput({type}) {
    const [value,setValue] = useState('het')
    const onChangeHandler = (e) => {
        setValue(e.target.value)
    }

    const input = <input value={value} onChange={onChangeHandler} type={type}/>

    return [input,value]
    
}

export default useInput
