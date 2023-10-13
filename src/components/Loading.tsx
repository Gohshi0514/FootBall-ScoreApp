import React from 'react'

const Loading = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-16 h-16 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin'></div>
        </div>
    )
}

export default Loading