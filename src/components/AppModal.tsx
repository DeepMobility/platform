'use client'

import { RiCloseLargeFill } from 'react-icons/ri'

export default function AppModal({
  children,
  closeModal,
  globalClose,
  size = "lg",
}: {
  children: React.ReactNode,
  closeModal: () => void,
  globalClose?: boolean,
  size?: "md" | "lg",
}) {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-gray-400/60 z-20 flex items-center justify-center"
      onClick={globalClose ? () => closeModal() : () => {}}
    >
      <div className={`
        relative bg-white rounded-3xl m-6 overflow-hidden
        ${size === "md" ? "w-[600px] md:h-[400px]" : "w-[700px] md:h-[450px]"}
      `}>
        <button
          onClick={closeModal}
          className='absolute z-30 top-4 right-4 bg-white rounded-lg border border-gay-100 p-1 text-gray-800'
        >
          <RiCloseLargeFill size="24px"/>
        </button>

        <div className='flex h-full'>
          {children}
        </div>
      </div>
    </div>
  )
}