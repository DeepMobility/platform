'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              <li>
                <Link
                  href="/rappels"
                  className={`flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                    pathname === '/rappels' ? 'bg-gray-100 text-gray-900 font-medium' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Rappels
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                    pathname === '/faq' ? 'bg-gray-100 text-gray-900 font-medium' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t">
            <Link
              href="/logout"
              prefetch={false}
              className="flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="mr-3" size={20} />
              <span className="font-medium">Déconnexion</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

