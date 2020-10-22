import React,{useState,useCallback} from 'react'

function useShow() {
    const [show,setShow] = useState(false)

    const toggleShow = useCallback((e) => {
        // e.stopPropagation()
        setShow(!show)
    })

    return {show,toggleShow}
}

export default useShow
