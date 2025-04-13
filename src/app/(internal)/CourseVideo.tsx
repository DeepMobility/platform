'use client'

import VideoCourseDone from '@/components/VideoCourseDone';
import Image from 'next/image'
import { useMemo } from "react";

export default function CourseVideo({
  video,
  videoIndex,
  dailyVideoCourseIndex,
  dailySessionDone,
  onClick,
  className,
}: {
  video: Video,
  videoIndex: number,
  dailyVideoCourseIndex: number,
  dailySessionDone: boolean,
  onClick: (v: Video) => void,
  className?: string,
}) {
  const videoCourseDone = useMemo(() => {
    return (videoIndex < dailyVideoCourseIndex || (dailySessionDone && videoIndex === dailyVideoCourseIndex))
  }, [videoIndex, dailyVideoCourseIndex, dailySessionDone])

  return (
    <button type="button"
      key={video.id}
      onClick={() => onClick(video)}
      className={
        "flex flex-col gap-2 items-center w-[244px] cursor-pointer hover:bg-gray-200 rounded-3xl p-2 "
        + (videoCourseDone ? "opacity-40 " : "") + className
      }
    >
      <div className="font-bold flex gap-2">
        <span>Jour {videoIndex + 1}</span>
      </div>
      <div className='relative'>
        <Image
          src={video.thumbnailUrl}
          width={240} height={150}
          unoptimized={true}
          className="brightness-50 rounded-xl w-[240px] h-[150px]"
          alt="Image de la video du jour"
        />

        <VideoCourseDone isDone={videoCourseDone} />
      </div>
      <div>{video.name}</div>
    </button>
  )
}