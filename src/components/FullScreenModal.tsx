'use client'

import { RiCloseLargeFill } from 'react-icons/ri'

export default function AppModal({
  children,
  closeModal,
  globalClose,
}: {
  children: React.ReactNode,
  closeModal: () => void,
  globalClose?: boolean,
}) {
  return (
    <div>
      <button onClick={closeModal} className='fixed z-30 top-4 right-4 text-gray-800'>
        <RiCloseLargeFill size="36px"/>
      </button>

      <div
        className="fixed inset-0 w-full h-full bg-gray-400/60 z-20 flex items-center justify-center"
        onClick={globalClose ? () => closeModal() : () => {}}
      >
        {children}
      </div>
    </div>
  )
}