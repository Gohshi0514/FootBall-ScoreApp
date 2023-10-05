import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap  px-6 py-1 text-gray-900 shadow-lg">
      <Link href="/"
        className="font-semibold text-xl tracking-tight"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={50}
        />

      </Link>
      <ul className="flex flex-row">
        <li className="mr-6">
          <Link href="/">
            試合結果 / 日程
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/standings">
            順位表
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar