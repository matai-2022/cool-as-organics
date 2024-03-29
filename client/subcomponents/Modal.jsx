import React from 'react'

function Modal(props) {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      {props.children}
    </div>
  )  
}

export default Modal