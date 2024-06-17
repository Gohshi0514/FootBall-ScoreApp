import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap  px-6 py-1 text-gray-900 shadow-lg">
      <div className="flex justify-between items-center w-full">
        <Link href="/"
          className="font-semibold text-xl tracking-tight"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className='object-contain'
            width={120}
            height={30}
          />

        </Link>
        <div>
          <ul className="flex justify-center items-center w-full">
            <li className="mr-3 text-sm">
              <Link href="/">
                試合結果 / 日程
              </Link>
            </li>
            <li className="text-sm">
              <Link href="/standings">
                順位表
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar