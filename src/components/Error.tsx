import React from 'react'

const Error: React.FC = () => {

    const reload = () => {
        window.location.reload()
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">エラーが発生しました</h2>
                <p className="text-gray-600 mb-6">データの取得中に問題が発生しました。時間をおいて再度お試しください。</p>
                <button
                    onClick={reload}
                    className="px-6 py-3 bg-gradient-to-r from-blue-800 to-purple-800 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center mx-auto"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    再読み込み
                </button>
            </div>
        </div>
    )
}

export default Error