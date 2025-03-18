import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Premier League Logo"
                className="h-10 w-auto"
                width={120}
                height={30}
              />
              <span className="ml-3 font-bold text-xl hidden md:block">Premier League</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link href="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                ${isActive('/')
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-white hover:bg-blue-800 hover:bg-opacity-75'}`}
            >
              試合結果 / 日程
            </Link>

            <Link href="/standings"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                ${isActive('/standings')
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-white hover:bg-blue-800 hover:bg-opacity-75'}`}
            >
              順位表
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar