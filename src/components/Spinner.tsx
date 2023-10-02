import React from 'react'

const Spinner = () => {
    return (
        // ローディング時のスピナー(上下中央に表示) 
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-16 h-16 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin'></div>
        </div>
    )
}

export default Spinner