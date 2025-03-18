import React from 'react'

const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className='w-20 h-20 relative'>
                <div className='absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-900 border-t-purple-600 rounded-full animate-spin'></div>
                <div className='absolute top-2 left-2 right-2 bottom-2 border-4 border-purple-600 border-b-blue-900 rounded-full animate-spin animation-delay-150'></div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-700">読み込み中...</h2>
            <p className="mt-2 text-gray-500">データを取得しています</p>
        </div>
    )
}

export default Loading