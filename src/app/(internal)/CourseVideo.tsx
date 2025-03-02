'use client'

import Image from 'next/image'

import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";

export default function CourseVideo({
  video,
  videoIndex,
  dailyVideoCourseIndex,
  dailySessionDone,
  onClick,
}: {
  video: Video,
  videoIndex: number,
  dailyVideoCourseIndex: number,
  dailySessionDone: boolean,
  onClick: (v: Video) => void
}) {
  const videoCourseDone = useMemo(() => {
    return (videoIndex < dailyVideoCourseIndex || (dailySessionDone && videoIndex === dailyVideoCourseIndex))
  }, [videoIndex, dailyVideoCourseIndex, dailySessionDone])

  return (
    <button type="button"
      key={video.id}
      onClick={() => onClick(video)}
      className={
        "flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2 "
        + (videoCourseDone ? "opacity-40" : "")
      }
    >
      <div className="font-bold flex gap-2">
        <span>Séance {videoIndex + 1}</span>
      </div>
      <div className='relative'>
        <Image
          src={video.thumbnailUrl}
          width={320} height={200}
          className="brightness-50 rounded-xl w-[240px] h-[150px]"
          alt="Image de la video du jour"
        />
        {videoCourseDone && (
          <div className=" bg-gray-400 absolute top-1/2 left-1/2 -mt-[20px] -ml-[20px] rounded-full p-2">
            <FaCheck size="24px" className="my-auto text-white"/>
          </div>
        )}
      </div>
      <div>{video.name}</div>
    </button>
  )
}