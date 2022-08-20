import React from 'react'
import { FiCheck } from 'react-icons/fi'

export default function Success({message}) {
  return (
    <div className='success container mx-auto'>
        <div className='flex justify-center mx-auto border border-yellow-200 bg-yellow-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5'>
            {message}<FiCheck size={25} color={'rgb(34,197,94)'} />
        </div>
    </div>
  )
}
