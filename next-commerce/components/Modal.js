import React from 'react'

function Modal({children}) {

 return <div className="modal h-screen overflow-y-scroll w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-10">

    <div className="bg-white rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        {children}
    </div>
  </div>
}

export default Modal
