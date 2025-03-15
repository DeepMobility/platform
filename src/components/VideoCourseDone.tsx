'use client'

import { FaCheck } from 'react-icons/fa'

export default function VideoCourseDone({ isDone }: { isDone: boolean }) {
  if (!isDone) {
    return null
  }

  return (
    <div className=" bg-gray-400 absolute top-1/2 left-1/2 -mt-[20px] -ml-[20px] rounded-full p-2">
      <FaCheck size="24px" className="my-auto text-white"/>
    </div>
  )
}