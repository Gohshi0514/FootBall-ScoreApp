import React from 'react'

const Error: React.FC = () => {

    const reload = () => {
        window.location.reload()
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen flex-col'>
            <div>データの取得中にエラーが発生しました。</div>
            {/* 更新 */}
            <button
                onClick={reload}
                className='px-4 py-2 m-1 rounded-md border border-gray-300'
            >
                更新
            </button>
        </div>
    )
}

export default Error