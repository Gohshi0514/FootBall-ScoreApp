import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 text-white">
        <Link href="/"
          className="font-semibold text-xl tracking-tight"
        >
          Home
        </Link>
        <ul className="flex flex-row">
          <li className="mr-6">
            <Link href="/">
              Home
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